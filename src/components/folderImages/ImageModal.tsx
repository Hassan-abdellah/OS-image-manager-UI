import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetImage, useImageNeighbors } from "@/hooks/useImages";
import type { imageData } from "@/types/apiDataTypes";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Spinner } from "../ui/spinner";
import { getBlobUrl } from "@/utils/imagesUtils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const ImageModal = ({
  isOpen,
  setIsOpen,
  image,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  image: imageData;
}) => {
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const isEnabled = useMemo(() => {
    return isOpen && image.id ? true : false;
  }, [isOpen, image.id]);

  const { prev, next } = useImageNeighbors(
    image.id,
    { folder_id: image.folder_id },
    isEnabled,
  );

  const {
    data: currentImage,
    isLoading,
    fetchImage,
  } = useGetImage(image.id, isEnabled);

  const handlePrevClick = useCallback(() => {
    if (prev) {
      setDirection("left");
      fetchImage(prev.id);
    }
  }, [prev, fetchImage]);
  const handleNextClick = useCallback(() => {
    if (next) {
      setDirection("right");
      fetchImage(next.id);
    }
  }, [next, fetchImage]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={image.file_name}
        className="h-screen sm:max-w-full max-w-full bg-black/10 p-0"
      >
        <div
          className={clsx(
            "mx-auto no-scrollbar max-h-screen w-full overflow-y-auto relative",
            {
              "animate-slide-in-left": direction === "left",
              "animate-slide-in-right": direction === "right",
            },
          )}
        >
          {isLoading ? (
            <div className="w-1/2 h-screen mx-auto bg-white flex items-center justify-center">
              <div className="flex items-center justify-center">
                <Spinner className="size-10" />
              </div>
            </div>
          ) : (
            <Fragment>
              {currentImage ? (
                <div>
                  <Button
                    type="button"
                    aria-label="Go Previous"
                    className="absolute left-4 top-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-transparent cursor-pointer"
                    onClick={() => handlePrevClick()}
                    disabled={!prev}
                  >
                    <ChevronLeft />
                  </Button>
                  <img
                    src={getBlobUrl(currentImage)}
                    alt={image.file_name}
                    className="w-full h-screen object-contain"
                  />

                  <Button
                    type="button"
                    aria-label="Go Next"
                    className="absolute right-4 top-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-transparent cursor-pointer"
                    onClick={() => handleNextClick()}
                    disabled={!next}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-screen bg-white" />
              )}
            </Fragment>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
