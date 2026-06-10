import type { AxiosInstance } from "axios";
import { IMAGESURL } from "./url_helper";

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
