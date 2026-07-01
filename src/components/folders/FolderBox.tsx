import type { folderData } from "@/types/apiDataTypes";
import FoldersIcon from "../icons/FoldersIcon";
import { Link } from "react-router";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import FolderContextMenu from "./FolderContextMenu";
import { Fragment, useState } from "react";
import RenameFolderForm from "./RenameFolderForm";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";
import { format } from "date-fns";

const FolderBox = ({ folder }: { folder: folderData }) => {
  const { isGridView, isListView } = useDisplay();

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
              className={clsx("flex rounded-lg", {
                "flex-col max-w-37.5 items-center": isGridView,
                "md:flex-row md:items-center flex-col items-start gap-2 p-2  hover:bg-platinum dark:hover:bg-black/90 rounded-md":
                  isListView,
              })}
            >
              {/* left side */}
              <div
                className={clsx("flex items-center gap-2", {
                  "flex-col": isGridView,
                  "flex-row": isListView,
                })}
              >
                <FoldersIcon
                  className={clsx({
                    "w-20 h-20": isGridView,
                    "w-5 h-5": isListView,
                  })}
                />

                <h5
                  className={clsx("capitalize text-center", {
                    "text-sm": isListView,
                  })}
                >
                  {folder.name.replaceAll("_", " ")}
                </h5>
              </div>

              {/* size and time in list view only */}
              {isListView ? (
                <div className="flex items-center gap-1 justify-end flex-1 text-pale-slate">
                  <span className="text-xs">
                    {format(folder.createdAt, "dd/MM/yyyy hh:mm:ss a")}
                  </span>
                </div>
              ) : null}
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
