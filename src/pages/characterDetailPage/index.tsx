import { useParams } from "react-router-dom";
import { CharacterDetail } from "@/components/characterDetail";

export default function CharacterDetailPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Invalid ID</p>;

    return (
        <div className="p-6">
            <CharacterDetail characterId={id} />
        </div>
    );
}