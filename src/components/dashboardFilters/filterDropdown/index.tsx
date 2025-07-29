import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DashboardFilters } from "..";
import { Button } from "@/components/ui/button";
import FilterIcon from '../../../assets/filter-icon.svg';

interface FilterState {
    status: string;
    species: string;
    gender: string;
    sortOrder: string;
}

interface FilterDropdownProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

function FilterDropdown({
    filters,
    onFilterChange,
}: FilterDropdownProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full min-h-[52px] max-h-[90px] justify-between text-muted-foreground cursor-pointer bg-[#F3F4F6] border-none rounded-[8px] text-[#6B7280]"
                >
                    Filters
                    <div className="flex p-[8px] hover:bg-[#EEE3FF] rounded-[8px] transition-colors">
                        <img src={FilterIcon} alt="Filter icon" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] sm:w-[300px] p-4 bg-[#FFF] border-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.46)]" align="start">
                <DashboardFilters filters={filters} onFilterChange={onFilterChange} />
            </PopoverContent>
        </Popover>
    );
}

export default FilterDropdown;