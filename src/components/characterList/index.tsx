import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { GetCharactersResponse } from "@/types/character";
import type { GetFavoriteCharacters } from "@/types/favoriteCharacters";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';
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

const GET_FAVORITES = gql`
  query CharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      species
      status
      gender
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
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();

    const favorites = useFavoritesStore((state) => state.favoriteIds);
    const addFavorite = useFavoritesStore((state) => state.addFavorite);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
    const [deletedCharacters, setDeletedCharacters] = useState<string[]>([]);
    const [favoriteCharacters, setFavoriteCharacters] = useState<any[]>([]);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        if (favorites.length === 0) {
            setFavoriteCharacters([]);
            return;
        }

        client
            .request<GetFavoriteCharacters>(GET_FAVORITES, { ids: favorites })
            .then((data) => {
                setFavoriteCharacters(data.charactersByIds || []);
            });
    }, [favorites]);


    const handleSoftDelete = (id: string) => {
        setDeletedCharacters((prev) => [...prev, id]);
        toast.error("Character soft deleted");
    };

    const handleCharacterClick = (characterId: string) => {
        if (isMobile) {
            navigate(`/character-mobile/${characterId}`);
        } else {
            navigate(`/characters/${characterId}`);
        }
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
            toast.error("Character removed from favorites");
        } else {
            addFavorite(id);
            toast.success("Character added to favorites");
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadCharacters(nextPage, true);
        toast.info("Loading more characters...");
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
        <div className="space-y-4 mt-6">

            <p className="text-[#6B7280] mt-5">
                Starred Characters ({filteredCharacters.length})
            </p>

            {favoriteCharacters.length > 0 && (
                <>
                    {favoriteCharacters.map((character) => (
                        <Card
                            key={character.id}
                            className="flex flex-row border-0 border-t border-t-[#E5E7EB] rounded-none shadow-none p-0 m-0"
                            onClick={() => handleCharacterClick(character.id)}
                        >
                            <div
                                className="w-full flex flex-row px-2 cursor-pointer hover:bg-[#EEE3FF] transition m-0 rounded-[8px]"
                            >
                                <div className="flex items-center gap-1">
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <CardContent className="p-4">
                                        <div className="min-w-[140px] max-w-[140px]">
                                            <p className="font-[500] text-[16px]">{character.name}</p>
                                        </div>
                                        <div className="min-w-[140px] max-w-[140px]">
                                            <p className="text-gray-500 text-[16px] font-[400]">{character.species}</p>
                                        </div>
                                    </CardContent>
                                </div>
                                <div className="flex items-center gap-2 pr-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(character.id);
                                        }}
                                    >
                                        <FaHeart className="text-xl text-green-500 transition" />
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
                            </div>
                        </Card>
                    ))}
                </>
            )}

            <p className="text-[#6B7280] mt-5">
                Characters ({filteredCharacters.length})
            </p>

            {filteredCharacters.map((character) => (
                <Card
                    key={character.id}
                    className="flex flex-row border-0 border-t border-t-[#E5E7EB] rounded-none shadow-none p-0 m-0"
                    onClick={() => handleCharacterClick(character.id)}
                >
                    <div
                        className="w-full flex flex-row px-2 cursor-pointer hover:bg-[#EEE3FF] transition m-0 rounded-[8px] justify-between md:justify-normal"
                    >
                        <div className="flex items-center gap-1">
                            <img
                                src={character.image}
                                alt={character.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <CardContent className="p-4">
                                <div className="min-w-[140px] max-w-[140px]">
                                    <p className="font-[500] text-[16px]">{character.name}</p>
                                </div>
                                <div className="min-w-[140px] max-w-[140px]">
                                    <p className="text-gray-500 text-[16px] font-[400]">{character.species}</p>
                                </div>
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
                        className="cursor-pointer px-4 py-2 bg-[#F3F4F6] text-black rounded hover:bg-[#EEE3FF] transition disabled:opacity-50"
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                    >
                        Load more
                    </button>
                </div>
            )}

            {!hasNextPage && characters.length > 0 && (
                <div className="text-center mt-4 text-gray-500">
                    <p>There are no more characters to load.</p>
                </div>
            )}
        </div>
    );
}