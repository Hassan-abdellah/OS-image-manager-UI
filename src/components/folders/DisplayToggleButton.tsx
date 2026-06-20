import { Grid2x2, Rows3 } from "lucide-react";
import { Button } from "../ui/button";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";

const DisplayToggleButton = () => {
  const { toggleDisplay, isGridView, isListView } = useDisplay();
  return (
    <div className="flex items-center bg-platinum dark:bg-black rounded-lg">
      <Button
        className={clsx(
          "cursor-pointer hover:bg-transparent rounded-none bg-transparent m-0 p-0 px-2 rounded-l-lg text-deep-space-blue  dark:text-bright-snow",
          {
            "bg-pale-slate dark:bg-deep-space-blue": isGridView,
          },
        )}
        aria-label="Grid View"
        onClick={() => toggleDisplay()}
      >
        <Grid2x2 />
      </Button>
      <Button
        className={clsx(
          "cursor-pointer hover:bg-transparent rounded-none bg-transparent m-0 p-0 px-2 rounded-r-lg text-deep-space-blue  dark:text-bright-snow",
          {
            "bg-pale-slate dark:bg-deep-space-blue": isListView,
          },
        )}
        aria-label="List View"
        onClick={() => toggleDisplay()}
      >
        <Rows3 />
      </Button>
    </div>
  );
};

export default DisplayToggleButton;
