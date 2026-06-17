import { Skeleton } from "@/components/ui/skeleton";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";

const FoldersListLoader = () => {
  const { isGridView, isListView } = useDisplay();

  return (
    <div
      className={clsx("grid", {
        "grid-cols-[repeat(auto-fill,120px)] justify-start gap-x-2 gap-y-4":
          isGridView,
        "grid-cols-1 justify-start gap-x-0 gap-y-1": isListView,
      })}
    >
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className={clsx({
            "flex items-center gap-1": isListView,
          })}
        >
          <Skeleton
            className={clsx("w-full", {
              "aspect-video mb-3 rounded-lg": isGridView,
              "h-6 w-6 rounded-md": isListView,
            })}
          />
          <Skeleton className="h-4 rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
};

export default FoldersListLoader;
