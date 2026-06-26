import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { XIcon } from "lucide-react";
import { revokeUrl } from "@/utils/imagesUtils";
import type { modifiedFileType } from "@/types";

const UploadImagesPreview = ({
  isOpen,
  setIsOpen,
  files,
  setFiles,
  isPending,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  files: modifiedFileType[];
  setFiles: (files: modifiedFileType[]) => void;
  isPending: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState<modifiedFileType>(
    files[0],
  );
  // sync when the files changes
  const currentSelection = files.includes(selectedImage)
    ? selectedImage
    : files[0];

  const removeFile = (file: modifiedFileType) => {
    if (file.url) revokeUrl(file.url);
    const filtered = files.filter((item) => item.file !== file.file);
    setFiles(filtered);
    if (!filtered.length) setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Images Preview</DialogTitle>
        </DialogHeader>
        {/* content */}
        <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4">
          <div className="w-full h-2/3 bg-background mb-4 rounded-md">
            <img
              src={currentSelection.url}
              alt={currentSelection.file.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* thumbnails */}
          <div className="flex items-center gap-2 flex-wrap">
            {files.map((file, idx) => {
              const isFileSelected = currentSelection === file;
              const isExceedsLimit = idx > 9;
              return (
                <div
                  key={`${file.file.name}-${idx}`}
                  className={clsx(
                    "w-26 h-26 rounded-md cursor-pointer border-2 transition-colors duration-150 relative",
                    {
                      "border-destructive": isExceedsLimit,
                      "border-foreground": isFileSelected,
                      "border-transparent": !isFileSelected && !isExceedsLimit,
                    },
                  )}
                  onClick={() => setSelectedImage(file)}
                >
                  <img
                    src={file.url}
                    alt={file.file.name}
                    className="w-full h-full rounded-md object-cover"
                  />

                  <Button
                    type="button"
                    aria-label="Remove File"
                    className={clsx(
                      "bg-background p-0 m-0 absolute -inset-2 translate-x-25 hover:bg-background cursor-pointer border-foreground border-2 flex items-center justify-center h-4 w-4 rounded-full",
                      {
                        "border-destructive text-destructive": isExceedsLimit,
                        "text-foreground": !isExceedsLimit,
                      },
                    )}
                    onClick={() => removeFile(file)}
                  >
                    <XIcon className="size-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter className="border-t-0">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            form="upload-form"
            type="submit"
            className="px-6 py-4 bg-fresh-sky hover:bg-cerulean text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
            disabled={files.length > 10}
          >
            {isPending ? (
              <>
                <Spinner />
                <span>Saving</span>
              </>
            ) : (
              <span>Save changes</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImagesPreview;
