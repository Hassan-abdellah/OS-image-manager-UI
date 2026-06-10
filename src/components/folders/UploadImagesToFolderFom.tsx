import { useRef } from "react";
import UploadInput from "../inputs/UploadInput";
import { Button } from "../ui/button";
import { useUploadFolderImages } from "@/hooks/useFolders";
import { Spinner } from "../ui/spinner";
import { UploadIcon } from "lucide-react";

const UploadImagesToFolderFom = ({ folderId }: { folderId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImages, isPending, error, isError } = useUploadFolderImages();
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fileInputRef.current?.files?.length) return;
    try {
      await uploadImages({
        images: fileInputRef.current?.files,
        folderId: folderId,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("error", isError ? error : "");
  return (
    <form className="flex items-center gap-2" onSubmit={handleUpload}>
      <UploadInput ref={fileInputRef} />
      <Button
        type="submit"
        className="px-6 py-4 bg-ink-black flex items-center gap-1.5 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner />
            <span>Uploading</span>
          </>
        ) : (
          <>
            <UploadIcon />
            <span>Upload</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default UploadImagesToFolderFom;
