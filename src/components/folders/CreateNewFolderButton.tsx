import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const CreateNewFolderButton = ({
  handleCreateFolder,
}: {
  handleCreateFolder: () => void;
}) => {
  return (
    <Button
      type="button"
      aria-label="Create New Folder"
      variant="link"
      className="self-start cursor-pointer px-0 flex items-center gap-1"
      onClick={handleCreateFolder}
    >
      <span>New Folder</span>
      <PlusIcon />
    </Button>
  );
};

export default CreateNewFolderButton;
