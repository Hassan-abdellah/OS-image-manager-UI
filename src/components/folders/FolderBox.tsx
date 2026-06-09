import type { folderData } from "@/types/apiDataTypes";
import FoldersIcon from "../icons/FoldersIcon";
import { Link } from "react-router";

const FolderBox = ({ folder }: { folder: folderData }) => {
  return (
    <Link
      to={`/folders/${folder.id}`}
      className="flex flex-col gap-1 cursor-pointer"
    >
      <FoldersIcon className="w-20 h-20" />
      <h5>{folder.name}</h5>
    </Link>
  );
};

export default FolderBox;
