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
    <div className="space-y-4">
        <Select 
            value={filters.status === "all" ? undefined : filters.status} 
            onValueChange={(value) => handleChange("status", value || "all")}
        >
            <SelectTrigger>
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="alive">Alive</SelectItem>
                <SelectItem value="dead">Dead</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
        </Select>

        <Select 
            value={filters.species === "all" ? undefined : filters.species} 
            onValueChange={(value) => handleChange("species", value || "all")}
        >
            <SelectTrigger>
                <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="human">Human</SelectItem>
                <SelectItem value="alien">Alien</SelectItem>
            </SelectContent>
        </Select>

        <Select 
            value={filters.gender === "all" ? undefined : filters.gender} 
            onValueChange={(value) => handleChange("gender", value || "all")}
        >
            <SelectTrigger>
                <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="genderless">Genderless</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
        </Select>

        <Select 
            value={filters.sortOrder} 
            onValueChange={(value) => handleChange("sortOrder", value)}
        >
            <SelectTrigger>
                <SelectValue placeholder="Ordenar por nombre" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="asc">A - Z</SelectItem>
                <SelectItem value="desc">Z - A</SelectItem>
            </SelectContent>
        </Select>
    </div>
  );
};