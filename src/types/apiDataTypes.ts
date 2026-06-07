export interface folderData {
  id: string;
  name: string;
  path: string;
  parent_id: string | null;
  createdAt: string;
  user_id: string;
}

export interface paramsType {
  page?: number;
  per_page?: number;
  sort_by?: "name" | "createdAt" | "size";
  sort_type?: "desc" | "asc";
  parent_id?: string;
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
  folders: string[];
  pagination?: paginationMeta;
}
