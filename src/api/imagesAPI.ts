import type { AxiosInstance } from "axios";
import { IMAGESURL } from "./url_helper";
import type { neighborsParams, neighborsRes } from "@/types/apiDataTypes";

// get image
export const getImage = async (
  api: AxiosInstance,
  imageId: string,
): Promise<Blob> => {
  const res: Blob = await api.get(`${IMAGESURL}/${imageId}`, {
    responseType: "blob",
  });
  return res;
};
// get image neighbors
export const getImageNeighbors = async (
  api: AxiosInstance,
  imageId: string,
  params?: neighborsParams,
): Promise<neighborsRes> => {
  const res: neighborsRes = await api.get(`${IMAGESURL}/${imageId}/neighbors`, {
    params,
  });
  return res;
};

// delete image
export const deleteImage = (
  api: AxiosInstance,
  imageId: string,
): Promise<void> => {
  return api.delete(`${IMAGESURL}/${imageId}`);
};

// delete image
export const deleteMultiImages = (
  api: AxiosInstance,
  imagesIds: string[],
): Promise<void> => {
  return api.delete(IMAGESURL, {
    data: {
      images_ids: imagesIds,
    },
  });
};
