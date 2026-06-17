import { create } from "zustand";

type displayType = "grid" | "list";

interface displayState {
  display: displayType;
  toggleDisplay: () => void;
  isGridView: boolean;
  isListView: boolean;
}
export const useDisplay = create<displayState>((set) => ({
  display: "grid",
  isGridView: true,
  isListView: false,
  toggleDisplay: () =>
    set((state) => {
      const newDisplay = state.display === "grid" ? "list" : "grid";
      return {
        display: newDisplay,
        isGridView: newDisplay === "grid",
        isListView: newDisplay === "list",
      };
    }),
}));
