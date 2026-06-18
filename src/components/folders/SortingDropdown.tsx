import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortingDropdownData } from "@/data/staticData";
import { useSortBy, useSorting, useSortType } from "@/store/useSorting";
import { ArrowDown, ArrowUp, ListFilter } from "lucide-react";
import { Fragment } from "react";
const SortingDropdown = () => {
  const { toggleSort } = useSorting();
  const sortBy = useSortBy();
  const sortType = useSortType();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer"
        aria-label="Sorting button"
      >
        <ListFilter />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortingDropdownData.map((item, index) => (
          <Fragment key={item.key}>
            <DropdownMenuItem
              className="cursor-pointer flex justify-between"
              onClick={() =>
                toggleSort(item.key, sortBy === "asc" ? "desc" : "asc")
              }
            >
              <span>{item.label}</span>

              {sortType === item.key ? (
                sortBy === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
            </DropdownMenuItem>
            {/* not for last item */}
            {index === sortingDropdownData.length - 1 ? null : (
              <DropdownMenuSeparator />
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingDropdown;
