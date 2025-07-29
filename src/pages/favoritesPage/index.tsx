import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart } from "react-icons/fa";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { GetFavoriteCharacters } from "@/types/favoriteCharacters";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const GET_FAVORITES = gql`
  query CharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      gender
      image
    }
  }
`;

function FavoritesPage() {
    const navigate = useNavigate();
    const [favoriteCharacters, setFavoriteCharacters] = useState<any[]>([]);
    const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

    useEffect(() => {
        if (favoriteIds.length === 0) {
            setFavoriteCharacters([]);
            return;
        }

        client
        .request<GetFavoriteCharacters>(GET_FAVORITES, { ids: favoriteIds })
        .then((data) => {
            setFavoriteCharacters(data.charactersByIds || []);
        });
    }, [favoriteIds]);

    const handleToggleFavorite = (id: string) => {
        removeFavorite(id);
    };

    if (favoriteCharacters.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No hay personajes favoritos aún.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {favoriteCharacters.map((character) => (
                <Card
                    key={character.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => navigate(`/characters/${character.id}`)}
                >
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <CardContent className="p-4 flex-1">
                        <p className="font-semibold">{character.name}</p>
                        <p className="text-xs text-gray-500">
                            {character.species} - {character.status}
                        </p>
                        <p className="text-xs text-gray-400">{character.gender}</p>
                    </CardContent>
                    <button
                        className="text-green-500 hover:text-red-500 p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(character.id);
                        }}
                    >
                        <FaHeart size={20} />
                    </button>
                </Card>
            ))}
        </div>
    );
}

export default FavoritesPage;