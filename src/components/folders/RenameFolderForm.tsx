import { useState } from "react";
import { Input } from "../ui/input";
import { useRenameFolder } from "@/hooks/useFolders";
import FoldersIcon from "../icons/FoldersIcon";
import { toast } from "sonner";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";
import { getErrorMessage } from "@/utils/apiErrorsUtils";
const RenameFolderForm = ({
  folderName,
  folderId,
  afterRenameCB,
}: {
  folderName: string;
  folderId: string;
  afterRenameCB: () => void;
}) => {
  const { isGridView, isListView } = useDisplay();

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
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <form
      className={clsx("flex rounded-lg", {
        "flex-col max-w-37.5": isGridView,
        "flex-row p-2 items-center gap-1": isListView,
      })}
      onSubmit={handleRenameFolder}
      onBlur={handleRenameFolder}
    >
      <FoldersIcon
        className={clsx({
          "w-20 h-20": isGridView,
          "w-5 h-5": isListView,
        })}
      />

      <Input
        id="form-rename-folder-name"
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

export default RenameFolderForm;
