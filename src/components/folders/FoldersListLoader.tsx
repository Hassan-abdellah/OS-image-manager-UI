import { Skeleton } from "@/components/ui/skeleton";

const FoldersListLoader = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-video w-full mb-3 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default FoldersListLoader;
