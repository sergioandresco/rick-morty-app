import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HeaderDashboard } from "@/components/header/dashboard";
import { CharacterList } from "@/components/characterList";
import { CharacterDetail } from "@/components/characterDetail";
import { DashboardFilters } from "@/components/dashboardFilters";

export default function DashboardPage() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    species: "all",
    gender: "all",
    sortOrder: "asc",
  });

  return (
    <>
        <HeaderDashboard />
        
        <div className="flex h-screen overflow-hidden">
            <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 overflow-y-auto">
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Rick and Morty list</h1>
                    <DashboardFilters filters={filters} onFilterChange={setFilters} />
                    <CharacterList filters={filters}/>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    </>
  );
}