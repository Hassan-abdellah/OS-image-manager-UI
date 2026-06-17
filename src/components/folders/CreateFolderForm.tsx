import { useState } from "react";
import FoldersIcon from "../icons/FoldersIcon";
import { Input } from "../ui/input";
import { useCreateFolder } from "@/hooks/useFolders";
import { toast } from "sonner";

const CreateFolderForm = ({
  folderName,
  parentId,
  afterCreateCB,
}: {
  folderName: string;
  parentId: string;
  afterCreateCB: () => void;
}) => {
  const [name, setName] = useState<string>(folderName);
  const { createFolder, isSaving } = useCreateFolder();

  const handleCreateFolder = async (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.FocusEvent<HTMLFormElement, Element>,
  ) => {
    e.preventDefault();

    if (!name) return;
    try {
      await createFolder({
        parent_id: parentId,
        name: name,
      });
      if (afterCreateCB) afterCreateCB();
      toast.success("Folder Created");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form
      className="flex flex-col rounded-lg max-w-37.5"
      onSubmit={handleCreateFolder}
      onBlur={handleCreateFolder}
    >
      <FoldersIcon className="w-20 h-20" />

      <Input
        id="form-new-folder-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSaving}
      />
    </form>
  );
};

export default CreateFolderForm;
