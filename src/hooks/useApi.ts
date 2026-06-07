import { createAxiosInstance } from "@/api/axios";
import { useAuth } from "@clerk/react";
import { useCallback } from "react";

export const useApi = () => {
  const { getToken } = useAuth();

  // Returns a pre-authenticated axios instance
  const getApi = useCallback(async () => {
    const token = await getToken(); // always fresh — Clerk refreshes automatically
    return createAxiosInstance(token);
  }, [getToken]);

  return { getApi };
};
