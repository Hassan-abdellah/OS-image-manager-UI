import type { folderData, imageData } from "@/types/apiDataTypes";
import FolderBox from "./FolderBox";
import FolderImageBox from "../folderImages/FolderImageBox";
import { Fragment, useCallback, useState } from "react";
import { Button } from "../ui/button";
import DeleteModal from "../common/DeleteModal";
import { useDeleteMultiImages } from "@/hooks/useImages";
import CreateNewFolderButton from "./CreateNewFolderButton";
import CreateFolderForm from "./CreateFolderForm";
import { useParams } from "react-router";
import DisplayToggleButton from "./DisplayToggleButton";
import { useDisplay } from "@/store/useDisplay";
import clsx from "clsx";

const FoldersGrid = ({
  folders,
  folderImages,
}: {
  folders: folderData[];
  folderImages: imageData[];
}) => {
  const { isGridView, isListView } = useDisplay();

  const { id: folderId } = useParams();

  const [imagesIds, setImagesIds] = useState<string[] | []>([]);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [generatedFolders, setGeneratedFilters] = useState<
    { id: number; name: string }[]
  >([]);
  const { deleteMultiImages, isPending: isDeleting } = useDeleteMultiImages();

  const handleDeleteMultiImages = useCallback(async () => {
    if (!imagesIds.length) return;
    await deleteMultiImages(imagesIds);
    setImagesIds([]);
  }, [imagesIds, deleteMultiImages]);

  // generate folder in UI
  const generateNewFolder = () => {
    const alreadyGenerated = [...generatedFolders];
    const newGenerated = {
      id: alreadyGenerated.length + 1,
      name: `New Folder ${alreadyGenerated.length + 1}`,
    };
    const combined = [...alreadyGenerated, newGenerated];
    setGeneratedFilters(combined);
  };
  // remove created folder from UI after saving to DB
  const removedCreatedFolder = (folderIdToRemove: number) => {
    setGeneratedFilters((prev) =>
      prev.filter((item) => item.id !== folderIdToRemove),
    );
  };
  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        {/* delete all images */}
        {folderImages.length && imagesIds.length ? (
          <div className="flex items-center gap-1.5 justify-end">
            <Button
              type="button"
              className="cursor-pointer py-4 px-2"
              disabled={imagesIds.length === 0}
              onClick={() => setImagesIds([])}
            >
              Unselect ({imagesIds.length}) Images
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer py-4 px-2"
              disabled={imagesIds.length === 0}
              onClick={() => setIsDeleteModal(true)}
            >
              Delete ({imagesIds.length}) Images
            </Button>
          </div>
        ) : null}
        {/* CTA */}
        <div className="flex items-center justify-between">
          {/* Create Folder Button */}
          <CreateNewFolderButton
            handleCreateFolder={() => generateNewFolder()}
          />
          {/* Toggle Display */}
          <DisplayToggleButton />
        </div>
        {/* Grid system */}
        {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6"> */}
        <div
          className={clsx("grid", {
            "grid-cols-[repeat(auto-fill,120px)] justify-start gap-x-2 gap-y-4":
              isGridView,
            "grid-cols-1 justify-start gap-x-0 gap-y-1": isListView,
          })}
        >
          {/* new folders */}
          {folderId ? (
            <Fragment>
              {generatedFolders.map((newFolder) => (
                <CreateFolderForm
                  folderName={newFolder.name}
                  parentId={folderId}
                  afterCreateCB={() => removedCreatedFolder(newFolder.id)}
                />
              ))}
            </Fragment>
          ) : null}

          {/* List folders */}
          {folders.map((folder) => (
            <FolderBox folder={folder} key={folder.id} />
          ))}
          {/* list images */}
          {folderImages.map((image) => (
            <FolderImageBox
              folderImage={image}
              key={image.id}
              imagesIds={imagesIds}
              setImagesIds={setImagesIds}
            />
          ))}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModal}
        setIsOpen={setIsDeleteModal}
        modalTitle="DELETE CONFIRMATION"
        modalDescription={`Are You Sure You Want to Delete Those ${imagesIds.length} Selected Images?`}
        isDeleting={isDeleting}
        onDelete={handleDeleteMultiImages}
      />
    </Fragment>
  );
};

export default FoldersGrid;
