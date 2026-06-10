import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { deleteImage, deleteMultiImages } from "@/api/imagesAPI";
import type { paramsType } from "@/types/apiDataTypes";

// Centralized query key factory
export const foldersKeys = {
  base: () => ["folders"] as const,
  all: (params?: paramsType) => [...foldersKeys.base(), params] as const,
};
// delete single image
export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  const mutation = useMutation<void, Error, string>({
    mutationFn: async (imageId: string) => deleteImage(await getApi(), imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    deleteImage: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};

// delete multi images
export const useDeleteMultiImages = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  const mutation = useMutation<void, Error, string[]>({
    mutationFn: async (imageIds: string[]) =>
      deleteMultiImages(await getApi(), imageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    deleteMultiImages: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
