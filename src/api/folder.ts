import { type AxiosInstance } from "axios";
import { FOLDERSURL, ROOTFOLDERURL } from "./url_helper";
import type {
  folderData,
  foldersResponse,
  paginationMeta,
  paramsType,
  SingleFoldersResponse,
} from "@/types/apiDataTypes";

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
export const getFolders = async (
  api: AxiosInstance,
  params?: paramsType | undefined,
): Promise<{
  folders: string[];
  pagination?: paginationMeta;
}> => {
  const res: foldersResponse = await api.get(FOLDERSURL, { params });
  console.log("res", res);
  return {
    folders: res.folders,
    pagination: res.pagination,
  };
};
