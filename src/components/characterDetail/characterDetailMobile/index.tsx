import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { HeaderDashboard } from "@/components/header/dashboard";
import { CharacterDetail } from "@/components/characterDetail";

export default function CharacterDetailMobile() {

	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	if (!id) return <p className="p-6 text-red-600">Invalid character ID</p>;

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
						Volver a la lista
					</button>
					<CharacterDetail characterId={id} />
				</div>
			</div>
		</div>
	);
}