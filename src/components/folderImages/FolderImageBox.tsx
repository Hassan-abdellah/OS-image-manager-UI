import type { imageData } from "@/types/apiDataTypes";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ArrowDownToLine,
  ExternalLink,
  Scissors,
  SquareCheck,
  Trash2,
} from "lucide-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import DeleteModal from "../common/DeleteModal";
import { useDeleteImage } from "@/hooks/useImages";
import clsx from "clsx";
const FolderImageBox = ({
  folderImage,
  imagesIds,
  setImagesIds,
}: {
  folderImage: imageData;
  imagesIds: string[];
  setImagesIds: (ids: string[] | []) => void;
}) => {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { deleteImage, isPending: isDeleting } = useDeleteImage();

  const handleDeleteImage = useCallback(async () => {
    if (!folderImage.id) return;
    await deleteImage(folderImage.id);
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
  return (
    <Fragment>
      <ContextMenu>
        <ContextMenuTrigger
          className={clsx(
            "flex flex-col gap-1 rounded-lg max-w-37.5 cursor-pointer",
            {
              "bg-pale-slate/50": isImageSelected,
            },
          )}
        >
          <img
            src={folderImage.url}
            alt={folderImage.file_name}
            className="w-20 h-20 object-contain"
          />
          <h5>{folderImage.file_name}</h5>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {/* First Group */}
          <ContextMenuGroup className="space-y-1">
            <ContextMenuItem
              className="cursor-pointer"
              onClick={() => window.open(`${folderImage.url}`, "_blank")}
            >
              <ExternalLink />
              <span>Open New Tab</span>
            </ContextMenuItem>
            <ContextMenuItem className="cursor-pointer">
              <Scissors />
              <span>Cut</span>
            </ContextMenuItem>
            <ContextMenuItem className="cursor-pointer">
              <ArrowDownToLine />
              <span>Download</span>
            </ContextMenuItem>
            <ContextMenuItem
              className="cursor-pointer"
              onClick={() => handleSelectImage()}
            >
              <SquareCheck />
              <span>Select</span>
            </ContextMenuItem>
          </ContextMenuGroup>

          <ContextMenuSeparator />
          {/* Second Group */}
          <ContextMenuGroup>
            <ContextMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => setIsDeleteModal(true)}
            >
              <Trash2 />
              <span>Delete</span>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
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
    </Fragment>
  );
};

export default FolderImageBox;
