import FoldersGrid from "@/components/folders/FoldersGrid";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import { useFolders } from "@/hooks/useFolders";
import { useParams } from "react-router";

const SingleFolderPage = () => {
  const { id: folderId } = useParams();
  const { folders, isLoading } = useFolders(
    { parent_id: folderId },
    folderId ? true : false,
  );
  console.log("folder", folders);
  return (
    <section className="container py-8">
      {isLoading ? (
        <FoldersListLoader />
      ) : (
        <>{folders.length > 0 ? <FoldersGrid folders={folders} /> : null}</>
      )}
    </section>
  );
};

export default SingleFolderPage;
