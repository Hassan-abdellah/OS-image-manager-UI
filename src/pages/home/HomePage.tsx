import { useRootFolder } from "@/hooks/useFolders";
import FolderBox from "@/components/folders/FolderBox";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import { useEffect } from "react";
import { capitalizeString } from "@/utils";

const HomePage = () => {
  const { data: folder, isLoading } = useRootFolder();

  useEffect(() => {
    document.title = isLoading
      ? "Loading..."
      : `ImgSH | ${capitalizeString(folder?.name)}`;
  }, [folder?.name, isLoading]);

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
