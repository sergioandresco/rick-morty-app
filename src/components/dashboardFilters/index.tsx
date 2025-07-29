import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterState {
    status: string;
    species: string;
    gender: string;
    sortOrder: string;
}

interface DashboardFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export const DashboardFilters = ({ filters, onFilterChange }: DashboardFiltersProps) => {

    const handleChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        onFilterChange(newFilters);
    };

    return (
        <div className="space-y-4 grid grid-cols-2">
            <Select
                value={filters.status === "all" ? undefined : filters.status}
                onValueChange={(value) => handleChange("status", value || "all")}
            >
                <SelectTrigger
                    className="border-[#E5E7EB] font-medium min-w-[120px] cursor-pointer hover:bg-[#EEE3FF] transition-colors"
                >
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent
                    className="bg-[#FFF] border-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.46)]"
                >
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="alive">Alive</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="dead">Dead</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="unknown">Unknown</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.species === "all" ? undefined : filters.species}
                onValueChange={(value) => handleChange("species", value || "all")}
            >
                <SelectTrigger
                    className="border-[#E5E7EB] font-medium min-w-[120px] cursor-pointer hover:bg-[#EEE3FF] transition-colors"
                >
                    <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent
                    className="bg-[#FFF] border-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.46)]"
                >
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="human">Human</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="alien">Alien</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.gender === "all" ? undefined : filters.gender}
                onValueChange={(value) => handleChange("gender", value || "all")}
            >
                <SelectTrigger
                    className="border-[#E5E7EB] font-medium min-w-[120px] cursor-pointer hover:bg-[#EEE3FF] transition-colors"
                >
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent
                    className="bg-[#FFF] border-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.46)]"
                >
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="male">Male</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="female">Female</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="genderless">Genderless</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="unknown">Unknown</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.sortOrder}
                onValueChange={(value) => handleChange("sortOrder", value)}
            >
                <SelectTrigger
                    className="border-[#E5E7EB] font-medium min-w-[120px] cursor-pointer hover:bg-[#EEE3FF] transition-colors"
                >
                    <SelectValue placeholder="Ordenar por nombre" />
                </SelectTrigger>
                <SelectContent
                    className="bg-[#FFF] border-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.46)]"
                >
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="asc">A - Z</SelectItem>
                    <SelectItem className="cursor-pointer hover:bg-[#EEE3FF] transition-colors" value="desc">Z - A</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};