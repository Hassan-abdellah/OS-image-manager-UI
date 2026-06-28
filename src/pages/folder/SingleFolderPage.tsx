import FolderBreadCrumb from "@/components/folders/FolderBreadCrumb";
import FoldersGrid from "@/components/folders/FoldersGrid";
import FoldersListLoader from "@/components/folders/FoldersListLoader";
import UploadImagesToFolderFom from "@/components/folders/UploadImagesToFolderFom";
import { Skeleton } from "@/components/ui/skeleton";
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
    <section className="container pb-8">
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <Skeleton className="h-6 rounded-lg w-1/2 mt-4" />
        ) : folder?.path ? (
          <FolderBreadCrumb pathChain={folder?.path_chain} />
        ) : null}
        {folderId ? <UploadImagesToFolderFom folderId={folderId} /> : null}
        {isLoading ? (
          <FoldersListLoader />
        ) : (
          <FoldersGrid folders={folders} folderImages={images} />
        )}
      </div>
    </section>
  );
};

export default SingleFolderPage;
