import FoldersGrid from "@/components/folders/FoldersGrid";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import UploadImagesToFolderFom from "@/components/folders/UploadImagesToFolderFom";
import { useFolders } from "@/hooks/useFolders";
import { useSorting } from "@/store/useSorting";
import { capitalizeString } from "@/utils";
import { useEffect } from "react";
import { useParams } from "react-router";

const SingleFolderPage = () => {
  const { id: folderId } = useParams();
  const { sort_by, sort_type } = useSorting();
  const { folder, folders, images, isLoading } = useFolders(
    { parent_id: folderId, sort_by, sort_type },
    folderId ? true : false,
  );

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
        <div className="flex flex-col gap-8">
          {folderId ? <UploadImagesToFolderFom folderId={folderId} /> : null}

          <FoldersGrid folders={folders} folderImages={images} />
        </div>
      )}
    </section>
  );
};

export default SingleFolderPage;
