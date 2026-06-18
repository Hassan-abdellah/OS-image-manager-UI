import type { sortByType } from "@/types/apiDataTypes";

export const sortingDropdownData: { label: string; key: sortByType }[] = [
  { label: "Name", key: "name" },
  { label: "Size", key: "size" },
  { label: "Date", key: "createdAt" },
];
