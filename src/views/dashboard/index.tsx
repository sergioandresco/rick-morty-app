import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { HeaderDashboard } from "@/components/header/dashboard";
import { CharacterList } from "@/components/characterList";
import FilterDropdown from "@/components/dashboardFilters/filterDropdown";

export default function DashboardPage() {

	const [filters, setFilters] = useState({
		status: "all",
		species: "all",
		gender: "all",
		sortOrder: "asc",
	});

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreen = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	return (
		<div className="flex flex-col h-screen">

			<HeaderDashboard />

			{isMobile ? (
				<div className="flex-1 overflow-y-auto bg-white">
					<div className="px-4 py-4">
						<p className="text-xl font-bold mb-4">Rick and Morty list</p>
						<FilterDropdown filters={filters} onFilterChange={setFilters} />
						<CharacterList filters={filters} />
					</div>
				</div>
			) : (
				<div className="flex flex-1 overflow-hidden">
					<aside className="w-1/3 lg:w-1/4 border-r border-gray-200 overflow-y-auto bg-white">
						<div className="px-9 py-4">
							<p className="text-xl font-bold mb-4">Rick and Morty list</p>
							<FilterDropdown filters={filters} onFilterChange={setFilters} />
							<CharacterList filters={filters} />
						</div>
					</aside>

					<main className="flex-1 p-6 overflow-y-auto bg-white">
						<Outlet />
					</main>
				</div>
			)}
		</div>
	);
}