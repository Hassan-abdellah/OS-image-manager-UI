import type { folderData } from "@/types/apiDataTypes";
import FolderBox from "./FolderBox";

const FoldersGrid = ({ folders }: { folders: folderData[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
      {folders.map((folder) => (
        <FolderBox folder={folder} key={folder.id} />
      ))}
    </div>
  );
};

export default FoldersGrid;
