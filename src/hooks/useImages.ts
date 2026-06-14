import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import {
  deleteImage,
  deleteMultiImages,
  getImage,
  getImageNeighbors,
} from "@/api/imagesAPI";
import type {
  neighborsParams,
  neighborsRes,
  paramsType,
} from "@/types/apiDataTypes";
import { useAuth } from "@clerk/react";
import { downloadBlob } from "@/utils/imagesUtils";
import { useState } from "react";

// Centralized query key factory
export const foldersKeys = {
  base: () => ["folders"] as const,
  all: (params?: paramsType) => [...foldersKeys.base(), params] as const,
  baseImage: () => ["images"] as const,
  details: (imageId: string) => [...foldersKeys.baseImage(), imageId] as const,
  neighbors: (imageId: string, params?: neighborsParams) =>
    [...foldersKeys.baseImage(), imageId, params] as const,
};

// get Single Image
export const useGetImage = (imageId: string, isEnabled: boolean = true) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { getApi } = useApi();
  const [dynamicId, setDynamicId] = useState<string>(imageId);
  // Stabilize params so the queryKey doesn't change every render
  const query = useQuery<Blob>({
    queryKey: foldersKeys.details(dynamicId),
    queryFn: async () => getImage(await getApi(), dynamicId),
    enabled: isLoaded && !!isSignedIn && isEnabled,
    staleTime: 1000 * 60 * 5, // ✅ add this
  });

  const fetchImage = async (id?: string) => {
    if (id) setDynamicId(id);
    await query.refetch();
  };
  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    fetchImage: fetchImage,
  };
};
// download Image
export const useDownloadImage = () => {
  const { getApi } = useApi();
  // Stabilize params so the queryKey doesn't change every render
  const mutation = useMutation({
    mutationFn: async ({
      imageId,
      fileName,
    }: {
      imageId: string;
      fileName?: string;
    }) => {
      const blob = await getImage(await getApi(), imageId);
      downloadBlob(blob, fileName);
    },
  });

  return {
    downloadImage: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};

// get image neighbors
export const useImageNeighbors = (
  imageId: string,
  params: neighborsParams = {},
  isEnabled: boolean = true,
) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { getApi } = useApi();
  // Stabilize params so the queryKey doesn't change every render
  const query = useQuery<neighborsRes>({
    queryKey: foldersKeys.neighbors(imageId, params),
    queryFn: async () => getImageNeighbors(await getApi(), imageId, params),
    enabled: isLoaded && !!isSignedIn && isEnabled,
    staleTime: 1000 * 60 * 5, // ✅ add this
  });

  return {
    next: query.data?.next,
    prev: query.data?.prev,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
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
