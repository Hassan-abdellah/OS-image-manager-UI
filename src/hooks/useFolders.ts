import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";

import type {
  folderData,
  paginationMeta,
  paramsType,
} from "@/types/apiDataTypes";
import { getFolders, getRootFolder } from "@/api/folder";

// Centralized query key factory
export const foldersKeys = {
  base: () => ["folders"] as const,
  all: (params?: paramsType) => [...foldersKeys.base(), params] as const,
};

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
export const useFolders = (params: paramsType = {}) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { getApi } = useApi();
  // Stabilize params so the queryKey doesn't change every render
  const query = useInfiniteQuery<{
    folders: string[];
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
    enabled: isLoaded && !!isSignedIn,
  });

  return {
    data: query.data?.pages.flatMap((page) => page.folders) ?? [],
    pagination: query.data?.pages?.at(-1)?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};
