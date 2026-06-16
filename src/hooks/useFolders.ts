import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";

import type {
  folderData,
  imageData,
  paginationMeta,
  paramsType,
} from "@/types/apiDataTypes";
import {
  createFolder,
  getFolders,
  getRootFolder,
  moveFolder,
  renameFolder,
  uploadFolderImages,
} from "@/api/folder";

// Centralized query key factory
export const foldersKeys = {
  base: () => ["folders"] as const,
  all: (params?: paramsType) => [...foldersKeys.base(), params] as const,
};

// get root folder
export const useRootFolder = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { getApi } = useApi();
  // Stabilize params so the queryKey doesn't change every render
  const query = useQuery<{
    folder: folderData;
  }>({
    queryKey: foldersKeys.base(),
    queryFn: async () => getRootFolder(await getApi()),
    enabled: isLoaded && !!isSignedIn,
    staleTime: 1000 * 60 * 5, // ✅ add this
  });

  return {
    data: query.data?.folder,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

// get folders
export const useFolders = (
  params: paramsType = {},
  isEnabled: boolean = true,
) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { getApi } = useApi();
  // Stabilize params so the queryKey doesn't change every render
  const query = useInfiniteQuery<{
    folders: folderData[];
    images: imageData[];
    pagination?: paginationMeta;
  }>({
    queryKey: foldersKeys.all(params),
    queryFn: async ({ pageParam = 1 }) =>
      getFolders(await getApi(), {
        ...params,
        page: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (!pagination) return undefined;
      const { page, totalPages } = pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: isLoaded && !!isSignedIn && isEnabled,
  });

  return {
    folders: query.data?.pages.flatMap((page) => page.folders) ?? [],
    images: query.data?.pages.flatMap((page) => page.images) ?? [],
    pagination: query.data?.pages?.at(-1)?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};

// create folder

export const useCreateFolder = () => {
  const { getApi } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { name: string; parent_id: string }) =>
      createFolder(await getApi(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    createFolder: mutation.mutateAsync,
    isSaving: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
// rename folder

export const useRenameFolder = () => {
  const { getApi } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      folderId,
      data,
    }: {
      folderId: string;
      data: { name: string };
    }) => renameFolder(await getApi(), folderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    renameFolder: mutation.mutateAsync,
    isSaving: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
// move folder

export const useMoveFolder = () => {
  const { getApi } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      folderId,
      data,
    }: {
      folderId: string;
      data: { new_parent_id: string };
    }) => moveFolder(await getApi(), folderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    moveFolder: mutation.mutateAsync,
    isSaving: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};

// upload images to folder

export const useUploadFolderImages = () => {
  const { getApi } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      images,
      folderId,
    }: {
      images: FileList;
      folderId: string;
    }) => uploadFolderImages(await getApi(), { folderId, images }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.base() });
    },
  });

  return {
    uploadImages: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
