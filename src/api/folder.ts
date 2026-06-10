import { type AxiosInstance } from "axios";
import { FOLDERSURL, IMAGESURL, ROOTFOLDERURL } from "./url_helper";
import type {
  folderData,
  foldersResponse,
  imageData,
  paginationMeta,
  paramsType,
  SingleFoldersResponse,
} from "@/types/apiDataTypes";

// Root Folder
export const getRootFolder = async (
  api: AxiosInstance,
): Promise<{
  folder: folderData;
}> => {
  const res: SingleFoldersResponse = await api.get(ROOTFOLDERURL);
  return {
    folder: res.folder,
  };
};
// List Folders
export const getFolders = async (
  api: AxiosInstance,
  params?: paramsType | undefined,
): Promise<{
  folders: folderData[];
  images: imageData[];
  pagination?: paginationMeta;
}> => {
  const res: foldersResponse = await api.get(FOLDERSURL, { params });
  return {
    folders: res.folders.folders,
    pagination: res.folders.pagination,
    images: res.images.images,
  };
};

// Upload images to folder
export const uploadFolderImages = (
  api: AxiosInstance,
  data: { folderId: string; images: FileList },
): Promise<folderData> => {
  const formData = new FormData();

  if (data.images instanceof FileList) {
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
  }

  return api.post(`${FOLDERSURL}/${data.folderId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete image
export const deleteImage = (
  api: AxiosInstance,
  imageId: string,
): Promise<void> => {
  return api.delete(`${IMAGESURL}/${imageId}`);
};
