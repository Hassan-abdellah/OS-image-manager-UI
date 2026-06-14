import type { folderData, imageData } from "@/types/apiDataTypes";
import FolderBox from "./FolderBox";
import FolderImageBox from "../folderImages/FolderImageBox";
import { Fragment, useCallback, useState } from "react";
import { Button } from "../ui/button";
import DeleteModal from "../common/DeleteModal";
import { useDeleteMultiImages } from "@/hooks/useImages";

const FoldersGrid = ({
  folders,
  folderImages,
}: {
  folders: folderData[];
  folderImages: imageData[];
}) => {
  const [imagesIds, setImagesIds] = useState<string[] | []>([]);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const { deleteMultiImages, isPending: isDeleting } = useDeleteMultiImages();

  const handleDeleteMultiImages = useCallback(async () => {
    if (!imagesIds.length) return;
    await deleteMultiImages(imagesIds);
    setImagesIds([]);
  }, [imagesIds, deleteMultiImages]);

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        {/* delete all images */}
        {folderImages.length && imagesIds.length ? (
          <div className="flex items-center gap-1.5 justify-end">
            <Button
              type="button"
              className="cursor-pointer py-4 px-2"
              disabled={imagesIds.length === 0}
              onClick={() => setImagesIds([])}
            >
              Unselect ({imagesIds.length}) Images
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer py-4 px-2"
              disabled={imagesIds.length === 0}
              onClick={() => setIsDeleteModal(true)}
            >
              Delete ({imagesIds.length}) Images
            </Button>
          </div>
        ) : null}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
          {folders.map((folder) => (
            <FolderBox folder={folder} key={folder.id} />
          ))}
          {folderImages.map((image) => (
            <FolderImageBox
              folderImage={image}
              key={image.id}
              imagesIds={imagesIds}
              setImagesIds={setImagesIds}
            />
          ))}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModal}
        setIsOpen={setIsDeleteModal}
        modalTitle="DELETE CONFIRMATION"
        modalDescription={`Are You Sure You Want to Delete Those ${imagesIds.length} Selected Images?`}
        isDeleting={isDeleting}
        onDelete={handleDeleteMultiImages}
      />
    </Fragment>
  );
};

export default FoldersGrid;
