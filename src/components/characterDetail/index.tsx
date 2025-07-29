// src/components/character-detail.tsx
import { useEffect, useState } from "react";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

export function CharacterDetail({ characterId }: { characterId: string }) {
  const [character, setCharacter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client
      .request(GET_CHARACTER, { id: characterId })
      .then((data) => setCharacter(data.character))
      .finally(() => setLoading(false));
  }, [characterId]);

  if (loading) {
    return <Skeleton className="w-full h-96 rounded-xl" />;
  }

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <img src={character.image} alt={character.name} className="w-24 h-24 rounded-lg" />
        <div>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p className="text-sm text-gray-500">{character.species} - {character.gender}</p>
        </div>
      </div>
      <CardContent className="mt-4 space-y-2">
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Origin:</strong> {character.origin?.name}</p>
        <p><strong>Location:</strong> {character.location?.name}</p>
      </CardContent>
    </Card>
  );
}