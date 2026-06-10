import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
const DeleteModal = ({
  isOpen,
  setIsOpen,
  modalTitle,
  modalDescription,
  onDelete,
  isDeleting,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  modalTitle: string;
  modalDescription: string;
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
}) => {
  const handleDelete = async () => {
    await onDelete();
    setIsOpen(false);
  };
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isDeleting) return; // prevent closing while deleting
        setIsOpen(open);
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
          <AlertDialogDescription aria-description={modalDescription}>
            {modalDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-pale-slate bg-transparent">
          <AlertDialogCancel
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            className="cursor-pointer flex items-center gap-0.5"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
