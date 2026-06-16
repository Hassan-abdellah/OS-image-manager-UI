import FoldersGrid from "@/components/folders/FoldersGrid";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import UploadImagesToFolderFom from "@/components/folders/UploadImagesToFolderFom";
import { useFolders } from "@/hooks/useFolders";
import { useEffect } from "react";
import { useParams } from "react-router";

const SingleFolderPage = () => {
  const { id: folderId } = useParams();
  const { folders, images, isLoading } = useFolders(
    { parent_id: folderId },
    folderId ? true : false,
  );

  useEffect(() => {
    document.title = "ImgSH | Folder";
  }, []);

  return (
    <section className="container py-8">
      {isLoading ? (
        <FoldersListLoader />
      ) : (
        <div className="flex flex-col gap-8">
          {folderId ? <UploadImagesToFolderFom folderId={folderId} /> : null}

          <FoldersGrid folders={folders} folderImages={images} />
        </div>
      )}
    </section>
  );
};

export default SingleFolderPage;
