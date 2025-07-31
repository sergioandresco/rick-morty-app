import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FaHeart } from "react-icons/fa";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { GetFavoriteCharacters } from "@/types/favoriteCharacters";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { HeaderDashboard } from "@/components/header/dashboard";
import { FaArrowLeft } from "react-icons/fa";

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

function FavoritesMobilePage() {

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
                There are no favorite characters yet.
            </p>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <HeaderDashboard />
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="p-4">
                    <button
                        onClick={() => navigate("/characters")}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to list
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {favoriteCharacters.map((character) => (
                            <Card
                                key={character.id}
                                onClick={() => navigate(`/characters/${character.id}`)}
                                className="relative max-w-sm cursor-pointer transition hover:shadow-lg shadow-md bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]"
                            >
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-4 space-y-1">
                                    <p className="text-lg font-semibold">{character.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {character.species} • {character.status}
                                    </p>
                                    <p className="text-sm text-gray-400">{character.gender}</p>
                                </CardContent>
                                <button
                                    className="absolute top-3 right-3 text-green-500 hover:text-red-600 z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleFavorite(character.id);
                                    }}
                                >
                                    <FaHeart size={22} />
                                </button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FavoritesMobilePage;