import { Spinner } from "../ui/spinner";

const ModalImageLoader = () => {
  return (
    <div className="w-1/2 h-screen mx-auto bg-white dark:bg-black flex items-center justify-center">
      <div className="flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    </div>
  );
};

export default ModalImageLoader;
