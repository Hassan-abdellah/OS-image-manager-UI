import { authPaths } from "@/data/routePaths";
import axios, { AxiosError, type AxiosInstance } from "axios";

// Factory — call this inside hooks/components where you have the token
export const createAxiosInstance = (token: string | null): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
    timeoutErrorMessage: "Time out",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  instance.interceptors.response.use(
    (res) => res.data,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        const isOnAuthPage = window.location.pathname.includes(authPaths.login);
        if (!isOnAuthPage) {
          window.location.href = authPaths.login;
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
