import { siteName } from "@/constants";
import { useEffect } from "react";

export const useDocTitle = (title: string) => {
  useEffect(() => {
    document.title = `${siteName} | ${title}`;
  }, [title]);
};
