import type { imageData } from "@/types/apiDataTypes";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import { Fragment, useCallback, useMemo, useState } from "react";
import DeleteModal from "../common/DeleteModal";
import { useDeleteImage } from "@/hooks/useImages";
import clsx from "clsx";
import ImageModal from "./ImageModal";
import { useDisplay } from "@/store/useDisplay";
import { getSizeWithUnit } from "@/utils/imagesUtils";
import { format } from "date-fns";
import { getErrorMessage } from "@/utils/apiErrorsUtils";
import { toast } from "sonner";
import FolderImageContextMenu from "./FolderImageContextMenu";
const FolderImageBox = ({
  folderImage,
  imagesIds,
  setImagesIds,
}: {
  folderImage: imageData;
  imagesIds: string[];
  setImagesIds: (ids: string[] | []) => void;
}) => {
  const { isGridView, isListView } = useDisplay();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { deleteImage, isPending: isDeleting } = useDeleteImage();
  const handleDeleteImage = useCallback(async () => {
    if (!folderImage.id) return;
    try {
      await deleteImage(folderImage.id);
      toast.success("Image Deleted");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  }, [folderImage.id, deleteImage]);

  const handleSelectImage = useCallback(() => {
    const imageId = folderImage.id;
    setImagesIds(
      imagesIds.includes(imageId)
        ? imagesIds.filter((item: string) => item !== imageId)
        : [...imagesIds, imageId],
    );
  }, [folderImage.id, imagesIds, setImagesIds]);

  const isImageSelected: boolean = useMemo(() => {
    return imagesIds.includes(folderImage.id);
  }, [folderImage.id, imagesIds]);

  const imageSize = useMemo(() => {
    const { value, unit } = getSizeWithUnit(folderImage.size);
    return `${value} ${unit}`;
  }, [folderImage.size]);

  return (
    <Fragment>
      <ContextMenu>
        <ContextMenuTrigger
          onClick={() => {
            setIsModal(true);
          }}
          className={clsx(
            "flex rounded-lg cursor-pointer hover:bg-platinum dark:hover:bg-black/90",
            {
              "flex-col gap-1 max-w-37.5 py-2 items-center": isGridView,
              "md:flex-row md:items-center flex-col items-start gap-x-2 gap-y-4 p-2":
                isListView,
              "bg-platinum dark:bg-black/90   shadow-xs shadow-border":
                isImageSelected,
            },
          )}
        >
          {/* left side */}
          <div
            className={clsx("flex items-center gap-2", {
              "flex-col": isGridView,
              "flex-row": isListView,
            })}
          >
            <div className="bg-black/85">
              <img
                src={folderImage.url}
                alt={folderImage.file_name}
                className={clsx("object-contain", {
                  "w-20 h-20": isGridView,
                  "w-5 h-5": isListView,
                })}
              />
            </div>
            <h5 className="text-center md:text-base text-sm">
              {folderImage.file_name}
            </h5>
          </div>

          {/* size and time in list view only */}
          {isListView ? (
            <div className="flex items-center gap-1 md:justify-end justify-start md:flex-1 flex-none">
              <span className="text-pale-slate text-xs">
                {format(folderImage.createdAt, "dd/MM/yyyy hh:mm:ss a")}
              </span>
              <span className="text-pale-slate-2 text-xs">{imageSize}</span>
            </div>
          ) : null}
        </ContextMenuTrigger>

        {/* Context Menu Body */}
        <FolderImageContextMenu
          image={folderImage}
          handleSelectClick={() => handleSelectImage()}
          handleDeleteClick={() => setIsDeleteModal(true)}
        />
      </ContextMenu>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModal}
        setIsOpen={setIsDeleteModal}
        modalTitle="DELETE CONFIRMATION"
        modalDescription="Are You sure you want to delete this image?"
        onDelete={handleDeleteImage}
        isDeleting={isDeleting}
      />

      {isModal ? (
        <ImageModal
          isOpen={isModal}
          setIsOpen={setIsModal}
          image={folderImage}
        />
      ) : null}
    </Fragment>
  );
};

export default FolderImageBox;
