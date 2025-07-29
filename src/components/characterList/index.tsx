import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { GetCharactersResponse } from "@/types/character";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
        results {
          id
          name
          image
          species
          status
          gender
        }
        info {
          next
          pages
        }
    }
  }
`;

export function CharacterList({
    filters,
}: {
    filters: {
        status: string;
        species: string;
        gender: string;
        sortOrder: string;
    };
}) {

    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const navigate = useNavigate();
    const favorites = useFavoritesStore((state) => state.favoriteIds);
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
    const [deletedCharacters, setDeletedCharacters] = useState<string[]>([]);


    const handleSoftDelete = (id: string) => {
        setDeletedCharacters((prev) => [...prev, id]);
    };

    const filteredCharacters = characters
        .filter((char) => {
            const notDeleted = !deletedCharacters.includes(char.id);
            const matchStatus =
                filters.status === "all" || char.status?.toLowerCase() === filters.status;
            const matchSpecies =
                filters.species === "all" || char.species?.toLowerCase().includes(filters.species.toLowerCase());
            const matchGender =
                filters.gender === "all" || char.gender?.toLowerCase() === filters.gender;

            return notDeleted && matchStatus && matchSpecies && matchGender;
        })
        .sort((a, b) => {
            return filters.sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

    const loadCharacters = async (pageToLoad: number, isLoadMore = false) => {
        if (isLoadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const data = await client.request<GetCharactersResponse>(GET_CHARACTERS, {
                page: pageToLoad,
            });

            setCharacters((prev) => {
                if (isLoadMore) {
                  const newCharacters = data.characters.results;
                  const merged = [...prev, ...newCharacters];
                  const unique = Array.from(new Map(merged.map((c) => [c.id, c])).values());
                  return unique;
                } else {
                  return data.characters.results;
                }
              });

            setHasNextPage(!!data.characters.info.next);
        } catch (error) {
            console.error("Error loading characters:", error);
        } finally {
            if (isLoadMore) {
                setLoadingMore(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadCharacters(1, false);
    }, []);

    const toggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadCharacters(nextPage, true);
    };

    if (loading && characters.length === 0) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-20 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {filteredCharacters.map((character) => (
                <Card
                    key={character.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => navigate(`/characters/${character.id}`)}
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <CardContent className="p-4">
                            <p className="font-semibold">{character.name}</p>
                            <p className="text-xs text-gray-500">{character.species}</p>
                        </CardContent>
                    </div>
                    <div className="flex items-center gap-2 pr-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(character.id);
                            }}
                        >
                            <FaHeart
                                className={`text-xl transition ${favorites.includes(character.id) ? "text-green-500" : "text-gray-400"
                                    }`}
                            />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSoftDelete(character.id);
                            }}
                        >
                            <MdDelete className="text-xl text-red-500 hover:text-red-600 transition" />
                        </button>
                    </div>
                </Card>
            ))}

            {loadingMore && (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={`loading-${i}`} className="w-full h-20 rounded-xl" />
                    ))}
                </div>
            )}

            {hasNextPage && !loadingMore && (
                <div className="text-center mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                    >
                        Cargar más
                    </button>
                </div>
            )}

            {!hasNextPage && characters.length > 0 && (
                <div className="text-center mt-4 text-gray-500">
                    <p>No hay más personajes para cargar</p>
                </div>
            )}
        </div>
    );
}