export interface folderData {
  id: string;
  name: string;
  path: string;
  parent_id: string | null;
  createdAt: string;
  user_id: string;
}

export interface imageData {
  id: string;
  file_name: string;
  original_name: string;
  size: number;
  createdAt: string;
  folder_id: string;
  user_id: string;
  url: string;
}
export interface paramsType {
  page?: number;
  per_page?: number;
  sort_by?: "name" | "createdAt" | "size";
  sort_type?: "desc" | "asc";
  parent_id?: string;
}
export interface neighborsParams {
  sort_by?: "name" | "createdAt" | "size";
  sort_type?: "desc" | "asc";
  folder_id?: string;
}
export interface paginationMeta {
  total: number;
  page: number;
  per_page: number;
  totalPages: number;
}
export interface SingleFoldersResponse {
  status: boolean;
  folder: folderData;
}
export interface foldersResponse {
  status: boolean;
  folder: folderData;
  folders: {
    folders: folderData[];
    pagination?: paginationMeta;
  };
  images: {
    images: imageData[];
    pagination?: paginationMeta;
  };
}

export interface neighborsRes {
  prev?: { id: string };
  next?: { id: string };
}
