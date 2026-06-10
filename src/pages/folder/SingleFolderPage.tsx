import FoldersGrid from "@/components/folders/FoldersGrid";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import UploadImagesToFolderFom from "@/components/folders/UploadImagesToFolderFom";
import { useFolders } from "@/hooks/useFolders";
import { useParams } from "react-router";

const SingleFolderPage = () => {
  const { id: folderId } = useParams();
  const { folders, images, isLoading } = useFolders(
    { parent_id: folderId },
    folderId ? true : false,
  );
  return (
    <section className="container py-8">
      {isLoading ? (
        <FoldersListLoader />
      ) : (
        <div className="flex flex-col gap-8">
          {folderId ? <UploadImagesToFolderFom folderId={folderId} /> : null}
          {folders.length > 0 ? (
            <FoldersGrid folders={folders} folderImages={images} />
          ) : null}
        </div>
      )}
    </section>
  );
};

export default SingleFolderPage;
