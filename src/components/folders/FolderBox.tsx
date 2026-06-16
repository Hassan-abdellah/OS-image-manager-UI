import type { folderData } from "@/types/apiDataTypes";
import FoldersIcon from "../icons/FoldersIcon";
import { Link } from "react-router";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import FolderContextMenu from "./FolderContextMenu";
import { Fragment, useState } from "react";
import RenameFolderForm from "./RenameFolderForm";

const FolderBox = ({ folder }: { folder: folderData }) => {
  const [isRenameMode, setIsRenameMode] = useState<boolean>(false);

  const onRenameClick = () => setIsRenameMode(true);
  const resetRename = () => setIsRenameMode(false);

  return (
    <Fragment>
      {isRenameMode ? (
        <RenameFolderForm
          folderId={folder.id}
          folderName={folder.name.replaceAll("_", " ")}
          afterRenameCB={resetRename}
        />
      ) : (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Link
              to={`/folders/${folder.id}`}
              className="flex flex-col rounded-lg max-w-37.5"
            >
              <FoldersIcon className="w-20 h-20" />

              <h5 className="capitalize">{folder.name.replaceAll("_", " ")}</h5>
            </Link>
          </ContextMenuTrigger>

          <FolderContextMenu
            folderId={folder.id}
            onRenameClick={onRenameClick}
          />
        </ContextMenu>
      )}
    </Fragment>
  );
};

export default FolderBox;
