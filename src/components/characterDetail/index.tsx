import { useEffect, useState } from "react";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { Character } from "@/types/character";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCommentsStore } from "@/store/useCommentsStore";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";

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
    const [newComment, setNewComment] = useState("");

    const addComment = useCommentsStore((state) => state.addComment);
    const removeComment = useCommentsStore((state) => state.removeComment);
    const getComments = useCommentsStore((state) => state.getComments);
    
    const [comments, setComments] = useState(() => getComments(characterId));

    useEffect(() => {
        setComments(getComments(characterId));
        
        const unsubscribe = useCommentsStore.subscribe((state) => {
            const currentComments = state.comments[characterId] || [];
            setComments(currentComments);
        });
        
        return unsubscribe;
    }, [characterId, getComments]);

    useEffect(() => {
        setLoading(true);
        client
            .request<Character>(GET_CHARACTER, { id: characterId })
            .then((data) => setCharacter(data.character))
            .finally(() => setLoading(false));
    }, [characterId]);

    const handleSaveComment = () => {
        if (newComment.trim()) {
            addComment(characterId, newComment.trim());
            setNewComment("");
        }
    };

    const handleDeleteComment = (commentId: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
            removeComment(characterId, commentId);
        }
    };

    if (loading) return <Skeleton className="w-full h-96 rounded-xl" />;
    if (!character) return <p>Character not found</p>;

    return (
        <>
            <Card className="p-4">
                <div className="flex items-center gap-4">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-24 h-24 rounded-lg"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{character.name}</h2>
                        <p className="text-sm text-gray-500">
                            {character.species} - {character.gender}
                        </p>
                    </div>
                </div>
                <CardContent className="mt-4 space-y-2">
                    <p>
                        <strong>Status:</strong> {character.status}
                    </p>
                    <p>
                        <strong>Origin:</strong> {character.origin?.name}
                    </p>
                    <p>
                        <strong>Location:</strong> {character.location?.name}
                    </p>
                </CardContent>
            </Card>

            <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Add a comment</h3>
                <Textarea
                    placeholder="Write your thoughts about this character..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                />
                <Button onClick={handleSaveComment} className="mt-2">
                    Save Comment
                </Button>
            </div>

            {comments.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-md mb-2">
                        Comment history for {character.name} ({comments.length})
                    </h4>
                    <ul className="space-y-3">
                        {[...comments].reverse().map((comment) => (
                            <li key={comment.id} className="border p-3 rounded-md relative group">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto w-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteComment(comment.id)}
                                    title="Eliminar comentario"
                                >
                                    <MdDelete size={14} />
                                </Button>
                                
                                <p className="text-sm text-gray-700 pr-8">{comment.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {comment.date ? format(new Date(comment.date), "PPpp") : "Unknown date"}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
