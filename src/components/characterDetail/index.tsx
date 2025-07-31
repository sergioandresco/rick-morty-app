import { useEffect, useState } from "react";
import { client } from "@/graphql/graphql-client";
import { gql } from "graphql-request";
import type { Character } from "@/types/character";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCommentsStore } from "@/store/useCommentsStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { toast } from "sonner";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

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
    const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
    const isFav = character && favoriteIds.includes(character.id.toString());

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
            toast.success("Comment added successfully!");
            setNewComment("");
        }
    };

    const handleDeleteComment = (commentId: string) => {
        removeComment(characterId, commentId);
        toast.error("Comment deleted successfully!");
    };

    if (loading) return <Skeleton className="w-full h-96 rounded-xl" />;
    if (!character) return <p>Character not found</p>;

    return (
        <>
            <Card className="p-4 shadow-none border-none">
                <div className="flex flex-col gap-4">
                    <div className="relative w-24 h-24">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        {isFav && (
                            <FaHeart
                                className="absolute bottom-1 right-1 text-green-500 bg-white rounded-full p-[2px] w-5 h-5"
                                style={{ width: '28px', height: '24px' }}
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="text-[24px] font-bold">{character.name}</h3>
                        <p className="font-[400] text-[#6B7280] text-[16px]">
                            {character.gender}
                        </p>
                    </div>
                </div>
                <CardContent className="mt-3 p-0 space-y-2">
                    <p className="flex flex-col pb-[16px] font-[400] text-[#6B7280] text-[16px] border-0 border-b border-b-[#E5E7EB]">
                        <strong className="font-[600] text-[#000]">Specie</strong> {character.species}
                    </p>
                    <p className="flex flex-col pb-[16px] font-[400] text-[#6B7280] text-[16px] border-0 border-b border-b-[#E5E7EB]">
                        <strong className="font-[600] text-[#000]">Status</strong> {character.status}
                    </p>
                    <p className="flex flex-col pb-[16px] font-[400] text-[#6B7280] text-[16px]">
                        <strong className="font-[600] text-[#000]">Location</strong> {character.location?.name}
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4 mt-0 p-4">
                <h3 className="font-semibold text-lg mb-2">Add a comment</h3>
                <Textarea
                    placeholder="Write your thoughts about this character..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                />
                <div className="flex w-full items-center justify-center">
                    <Button
                        onClick={handleSaveComment}
                        disabled={!newComment.trim()}
                        className={`max-w-[400px] min-w-[200px] md:min-w-[400px] mt-2 rounded-[8px] transition-colors ${newComment.trim()
                            ? "bg-[#8054C7] text-white cursor-pointer"
                            : "bg-[#F3F4F6] text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Save Comment
                    </Button>
                </div>
            </div>

            {comments.length > 0 && (
                <div className="flex flex-col gap-4 mt-6 p-4">
                    <h3 className="font-semibold text-md mb-2">
                        Comment history for {character.name} ({comments.length})
                    </h3>
                    <ul className="space-y-3">
                        {[...comments].reverse().map((comment) => (
                            <li key={comment.id} className="border p-3 rounded-md relative group">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-pointer absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto w-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDeleteComment(comment.id)}
                                    title="Eliminar comentario"
                                >
                                    <MdDelete style={{ width: '25px', height: '25px' }} />
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