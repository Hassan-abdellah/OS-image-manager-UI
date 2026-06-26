import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  ArrowDownToLine,
  ExternalLink,
  Scissors,
  SquareCheck,
  Trash2,
} from "lucide-react";
import { downloadImgURL } from "@/utils/imagesUtils";
import type { imageData } from "@/types/apiDataTypes";

const FolderImageContextMenu = ({
  image,
  handleSelectClick,
  handleDeleteClick,
}: {
  image: imageData;
  handleSelectClick: () => void;
  handleDeleteClick: () => void;
}) => {
  return (
    <ContextMenuContent className="w-48">
      {/* First Group */}
      <ContextMenuGroup className="space-y-1">
        <ContextMenuItem
          className="cursor-pointer"
          onClick={() => window.open(`${image.url}`, "_blank")}
        >
          <ExternalLink />
          <span>Open New Tab</span>
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">
          <Scissors />
          <span>Cut</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="cursor-pointer"
          onClick={async () => await downloadImgURL(image.url, image.file_name)}
        >
          <ArrowDownToLine />
          <span>Download</span>
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer" onClick={handleSelectClick}>
          <SquareCheck />
          <span>Select</span>
        </ContextMenuItem>
      </ContextMenuGroup>

      <ContextMenuSeparator />
      {/* Second Group */}
      <ContextMenuGroup>
        <ContextMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleDeleteClick}
        >
          <Trash2 />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
};

export default FolderImageContextMenu;
