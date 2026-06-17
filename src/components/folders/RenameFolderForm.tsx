import { useState } from "react";
import { Input } from "../ui/input";
import { useRenameFolder } from "@/hooks/useFolders";
import FoldersIcon from "../icons/FoldersIcon";
import { toast } from "sonner";

const RenameFolderForm = ({
  folderName,
  folderId,
  afterRenameCB,
}: {
  folderName: string;
  folderId: string;
  afterRenameCB: () => void;
}) => {
  const [name, setName] = useState<string>(folderName);
  const { renameFolder, isSaving } = useRenameFolder();

  const handleRenameFolder = async (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.FocusEvent<HTMLFormElement, Element>,
  ) => {
    e.preventDefault();

    if (!name) return;
    try {
      await renameFolder({ folderId: folderId, data: { name: name } });
      if (afterRenameCB) afterRenameCB();
      toast.success("Folder Renamed");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form
      className="flex flex-col rounded-lg max-w-37.5"
      onSubmit={handleRenameFolder}
      onBlur={handleRenameFolder}
    >
      <FoldersIcon className="w-20 h-20" />

      <Input
        id="form-rename-folder-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSaving}
      />
    </form>
  );
};

export default RenameFolderForm;
