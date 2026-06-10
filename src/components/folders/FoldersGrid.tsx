import type { folderData, imageData } from "@/types/apiDataTypes";
import FolderBox from "./FolderBox";
import FolderImageBox from "../folderImages/FolderImageBox";

const FoldersGrid = ({
  folders,
  folderImages,
}: {
  folders: folderData[];
  folderImages: imageData[];
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
      {folders.map((folder) => (
        <FolderBox folder={folder} key={folder.id} />
      ))}
      {folderImages.map((image) => (
        <FolderImageBox folderImage={image} key={image.id} />
      ))}
    </div>
  );
};

export default FoldersGrid;
