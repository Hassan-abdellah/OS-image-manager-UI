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
import { useDeleteImage, useDownloadImage } from "@/hooks/useImages";
import clsx from "clsx";
import ImageModal from "./ImageModal";
const FolderImageBox = ({
  folderImage,
  imagesIds,
  setImagesIds,
}: {
  folderImage: imageData;
  imagesIds: string[];
  setImagesIds: (ids: string[] | []) => void;
}) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { deleteImage, isPending: isDeleting } = useDeleteImage();
  const { downloadImage, isPending: isDownloading } = useDownloadImage();
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
          onClick={() => {
            setIsModal(true);
          }}
          className={clsx(
            "flex flex-col items-center py-2 gap-1 rounded-lg max-w-37.5 cursor-pointer hover:bg-pale-slate/30",
            {
              "bg-pale-slate/30": isImageSelected,
            },
          )}
        >
          <div className="bg-black/85">
            <img
              src={folderImage.url}
              alt={folderImage.file_name}
              className="w-20 h-20 object-contain"
            />
          </div>
          <h5 className="text-center">{folderImage.file_name}</h5>
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
            <ContextMenuItem
              className="cursor-pointer"
              disabled={isDownloading}
              onClick={async () =>
                await downloadImage({
                  imageId: folderImage.id,
                  fileName: folderImage.original_name,
                })
              }
            >
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
