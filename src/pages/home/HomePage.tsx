import { useRootFolder } from "@/hooks/useFolders";
import FolderBox from "@/components/folders/FolderBox";
import FoldersListLoader from "@/components/folders/FoldersListLoader";

const HomePage = () => {
  const { data: folder, isLoading } = useRootFolder();
  return (
    <section className="container py-8">
      {isLoading ? (
        <FoldersListLoader />
      ) : (
        <>{folder ? <FolderBox folder={folder} /> : null}</>
      )}
    </section>
  );
};

export default HomePage;
