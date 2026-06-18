import type { sortByType, sortDirType } from "@/types/apiDataTypes";
import { create } from "zustand";

interface sortState {
  sort_by: sortByType;
  sort_type: sortDirType;
  toggleSort: (type: sortByType, dir: sortDirType) => void;
}
export const useSorting = create<sortState>((set) => ({
  sort_by: "createdAt",
  sort_type: "desc",
  toggleSort: (type: sortByType, dir: sortDirType) =>
    set(() => {
      return {
        sort_by: type,
        sort_type: dir,
      };
    }),
}));

export const useSortType = () => useSorting((state) => state.sort_by);
export const useSortBy = () => useSorting((state) => state.sort_type);
