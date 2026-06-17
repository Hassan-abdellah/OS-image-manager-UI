import { useState } from "react";
import FoldersIcon from "../icons/FoldersIcon";
import { Input } from "../ui/input";
import { useCreateFolder } from "@/hooks/useFolders";
import { toast } from "sonner";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";

const CreateFolderForm = ({
  folderName,
  parentId,
  afterCreateCB,
}: {
  folderName: string;
  parentId: string;
  afterCreateCB: () => void;
}) => {
  const { isGridView, isListView } = useDisplay();

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
      className={clsx("flex rounded-lg", {
        "flex-col max-w-37.5": isGridView,
        "flex-row p-2 items-center gap-1": isListView,
      })}
      onSubmit={handleCreateFolder}
      onBlur={handleCreateFolder}
    >
      <FoldersIcon
        className={clsx({
          "w-20 h-20": isGridView,
          "w-5 h-5": isListView,
        })}
      />

      <Input
        id="form-new-folder-name"
        className={clsx({
          "h-full": isListView,
        })}
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSaving}
      />
    </form>
  );
};

export default CreateFolderForm;
