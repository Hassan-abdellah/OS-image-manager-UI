import { Fragment, useState } from "react";
import UploadInput from "../inputs/UploadInput";
import { Button } from "../ui/button";
import { useUploadFolderImages } from "@/hooks/useFolders";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/apiErrorsUtils";
import UploadImagesPreview from "../folderImages/UploadImagesPreview";
import { UploadIcon } from "lucide-react";
import { getFileUrl } from "@/utils/imagesUtils";
import type { modifiedFileType } from "@/types";

const UploadImagesToFolderFom = ({ folderId }: { folderId: string }) => {
  const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
  const [files, setFiles] = useState<modifiedFileType[]>([]);

  const { uploadImages, isPending } = useUploadFolderImages();
  const handleUpload = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files?.length) return;
    try {
      await uploadImages({
        images: files.map((item) => item.file),
        folderId: folderId,
      });
      setIsPreviewModal(false);
      setFiles([]);
      toast.success(`${files.length} Images Upload Successfully`);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  const handleSelectFiles = (incoming: File[]): void => {
    const modifiedFiles = incoming.map((file) => {
      return { file, url: getFileUrl(file) };
    });
    setFiles(modifiedFiles);
  };

  return (
    <Fragment>
      <form
        className="flex md:items-center items-start md:flex-row flex-col gap-2"
        onSubmit={handleUpload}
        id="upload-form"
      >
        <UploadInput files={files} handleSelectFiles={handleSelectFiles} />
        <Button
          type="button"
          // type="submit"
          className="px-6 py-4 bg-fresh-sky hover:bg-cerulean text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          // disabled={isPending}
          onClick={() => {
            if (!files?.length) return;
            setIsPreviewModal(true);
          }}
        >
          <UploadIcon />
          Upload
        </Button>
      </form>
      {isPreviewModal && (
        <UploadImagesPreview
          isOpen={isPreviewModal}
          setIsOpen={setIsPreviewModal}
          files={files}
          setFiles={setFiles}
          isPending={isPending}
        />
      )}
    </Fragment>
  );
};

export default UploadImagesToFolderFom;
