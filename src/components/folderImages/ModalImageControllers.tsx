import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

const ModalImageControllers = ({
  isPrevDisabled,
  handlePrevClick,
  isNextDisabled,
  handleNextClick,
  handleCloseClick,
}: {
  isPrevDisabled: boolean;
  handlePrevClick: () => void;
  isNextDisabled: boolean;
  handleNextClick: () => void;
  handleCloseClick: () => void;
}) => {
  return (
    <>
      {/* close button */}
      <Button
        type="button"
        aria-label="close image"
        className="icon-circle-btn top-2 left-4 bg-foreground text-background"
        onClick={handleCloseClick}
      >
        <XIcon />
      </Button>

      <Button
        type="button"
        aria-label="Go Previous"
        className="icon-circle-btn modal-control-btn left-4"
        onClick={handlePrevClick}
        disabled={isPrevDisabled}
      >
        <ChevronLeft />
      </Button>
      <Button
        type="button"
        aria-label="Go Next"
        className="icon-circle-btn modal-control-btn right-4"
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        <ChevronRight />
      </Button>
    </>
  );
};

export default ModalImageControllers;
