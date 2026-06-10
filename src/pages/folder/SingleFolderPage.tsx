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
        <>
          {folders.length > 0 ? (
            <div className="flex flex-col gap-8">
              {folderId ? (
                <UploadImagesToFolderFom folderId={folderId} />
              ) : null}
              <FoldersGrid folders={folders} folderImages={images} />
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};

export default SingleFolderPage;
