import { type AxiosInstance } from "axios";
import { FOLDERSURL, ROOTFOLDERURL } from "./url_helper";
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
  folder: folderData;
  folders: folderData[];
  images: imageData[];
  pagination?: paginationMeta;
}> => {
  const res: foldersResponse = await api.get(FOLDERSURL, { params });
  return {
    folder: res.folder,
    folders: res.folders.folders,
    pagination: res.folders.pagination,
    images: res.images.images,
  };
};

// Create Folder
export const createFolder = async (
  api: AxiosInstance,
  data: { name: string; parent_id: string },
): Promise<{
  folder: folderData;
}> => await api.post(FOLDERSURL, { ...data });

// rename Folder
export const renameFolder = async (
  api: AxiosInstance,
  folderId: string,
  data: { name: string },
): Promise<{
  folder: folderData;
}> => await api.put(`${FOLDERSURL}/${folderId}/rename`, { ...data });
// move Folder
export const moveFolder = async (
  api: AxiosInstance,
  folderId: string,
  data: { new_parent_id: string },
): Promise<{
  folder: folderData;
}> => await api.patch(`${FOLDERSURL}/${folderId}/move`, { data });

// Upload images to folder
export const uploadFolderImages = (
  api: AxiosInstance,
  data: { folderId: string; images: File[] },
  onProgress?: (progress: number) => void,
): Promise<folderData> => {
  const formData = new FormData();
  if (data.images.length > 0) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return api.post(`${FOLDERSURL}/${data.folderId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress(progressEvent) {
      if (progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        onProgress?.(progress);
      }
    },
  });
};
// delete Folder
export const deleteFolder = async (
  api: AxiosInstance,
  folderId: string,
): Promise<{
  folder: folderData;
}> => await api.delete(`${FOLDERSURL}/${folderId}`);
