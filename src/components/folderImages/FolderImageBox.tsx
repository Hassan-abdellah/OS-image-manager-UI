import type { imageData } from "@/types/apiDataTypes";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";
import { Fragment, useCallback, useState } from "react";
import DeleteModal from "../common/DeleteModal";
import { useDeleteImage } from "@/hooks/useFolders";
const FolderImageBox = ({ folderImage }: { folderImage: imageData }) => {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const { deleteImage, isPending: isDeleting } = useDeleteImage();

  const handleDeleteImage = useCallback(async () => {
    if (!folderImage.id) return;
    await deleteImage(folderImage.id);
  }, [folderImage.id, deleteImage]);

  return (
    <Fragment>
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col gap-1 rounded-lg max-w-37.5 cursor-pointer">
          <img
            src={folderImage.url}
            alt={folderImage.file_name}
            className="w-20 h-20 object-contain"
          />
          <h5>{folderImage.file_name}</h5>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {/* First Group */}
          <ContextMenuGroup>
            <ContextMenuItem
              className="cursor-pointer"
              onClick={() => window.open(`${folderImage.url}`, "_blank")}
            >
              Open In New Tab
            </ContextMenuItem>
            <ContextMenuItem disabled className="cursor-pointer">
              Back
            </ContextMenuItem>
            <ContextMenuItem disabled>Forward</ContextMenuItem>
            <ContextMenuItem disabled className="cursor-pointer">
              Reload
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
