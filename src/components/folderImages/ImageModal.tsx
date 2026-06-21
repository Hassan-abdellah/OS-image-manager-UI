import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetImage, useImageNeighbors } from "@/hooks/useImages";
import type { imageData } from "@/types/apiDataTypes";
import { Fragment, useCallback, useMemo, useState } from "react";
import { downloadBlob, getBlobUrl } from "@/utils/imagesUtils";

import clsx from "clsx";
import { useSorting } from "@/store/useSorting";
import ModalImageLoader from "./ModalImageLoader";
import ModalImageControllers from "./ModalImageControllers";
import { Button } from "../ui/button";
import { ArrowDownToLine } from "lucide-react";

const ImageModal = ({
  isOpen,
  setIsOpen,
  image,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  image: imageData;
}) => {
  const { sort_by, sort_type } = useSorting();

  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const isEnabled = useMemo(() => {
    return isOpen && image.id ? true : false;
  }, [isOpen, image.id]);

  const params = useMemo(
    () => ({
      folder_id: image.folder_id,
      sort_by,
      sort_type,
    }),
    [image.folder_id, sort_by, sort_type],
  );
  const {
    data: currentImage,
    isLoading,
    fetchImage,
  } = useGetImage(image.id, isEnabled);

  const { prev, next, fetchNeighbors } = useImageNeighbors(
    image.id,
    params,
    isEnabled,
  );

  const handlePrevClick = useCallback(() => {
    if (prev) {
      setDirection("left");
      fetchImage(prev.id);
      fetchNeighbors(prev.id, params);
    }
  }, [prev, fetchImage, fetchNeighbors, params]);

  const handleNextClick = useCallback(() => {
    if (next) {
      setDirection("right");
      fetchImage(next.id);
      fetchNeighbors(next.id, params);
    }
  }, [next, fetchImage, fetchNeighbors, params]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={image.file_name}
        className="h-screen sm:max-w-full max-w-full bg-black/10 p-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            handleNextClick();
          } else if (e.key === "ArrowLeft") {
            handlePrevClick();
          } else return;
        }}
      >
        <div className={clsx("relative")}>
          {isLoading ? (
            <ModalImageLoader />
          ) : (
            <Fragment>
              {currentImage ? (
                <>
                  {/* image */}
                  <div
                    className={clsx({
                      "animate-slide-in-left": direction === "left",
                      "animate-slide-in-right": direction === "right",
                    })}
                    onAnimationEnd={() => setDirection(null)}
                  >
                    <img
                      src={getBlobUrl(currentImage)}
                      alt={image.file_name}
                      className="w-full h-[95vh] object-contain"
                    />

                    <div className="h-[5vh] flex items-center justify-center">
                      <Button
                        type="button"
                        className="cursor-pointer flex items-center justify-center w-8 h-8 bg-transparent hover:bg-transparent text-foreground"
                        aria-label="Download Image"
                        onClick={() => downloadBlob(currentImage)}
                      >
                        <ArrowDownToLine className="size-5" />
                      </Button>
                    </div>
                  </div>

                  {/* controls */}

                  <ModalImageControllers
                    handleNextClick={handleNextClick}
                    handlePrevClick={handlePrevClick}
                    isNextDisabled={!next}
                    isPrevDisabled={!prev}
                    handleCloseClick={() => setIsOpen(false)}
                  />
                </>
              ) : null}
            </Fragment>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
