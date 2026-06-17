import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { PencilIcon, Scissors, Trash2 } from "lucide-react";
import { Fragment, useCallback, useState } from "react";
import DeleteModal from "../common/DeleteModal";
import { useDeleteFolder } from "@/hooks/useFolders";
import { toast } from "sonner";
const FolderContextMenu = ({
  folderId,
  onRenameClick,
}: {
  folderId: string;
  onRenameClick: () => void;
}) => {
  const { deleteFolder, isDeleting } = useDeleteFolder();
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const handleDeleteFolder = useCallback(async () => {
    if (!folderId) return;
    await deleteFolder(folderId);
    toast.success("Folder Deleted");
  }, [folderId, deleteFolder]);
  return (
    <Fragment>
      <ContextMenuContent className="w-48">
        {/* First Group */}
        <ContextMenuGroup className="space-y-1">
          <ContextMenuItem className="cursor-pointer" onClick={onRenameClick}>
            <PencilIcon />
            <span>Rename</span>
          </ContextMenuItem>
          <ContextMenuItem className="cursor-pointer">
            <Scissors />
            <span>Cut</span>
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModal}
        setIsOpen={setIsDeleteModal}
        modalTitle="DELETE CONFIRMATION"
        modalDescription="Are You sure you want to delete this folder with its content?"
        onDelete={handleDeleteFolder}
        isDeleting={isDeleting}
      />
    </Fragment>
  );
};

export default FolderContextMenu;
