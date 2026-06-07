import { authPaths } from "@/data/routePaths";
import axios, { type AxiosInstance } from "axios";

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
    (error) => {
      if (error.response?.status === 401) {
        // e.g. redirect to sign-in
        window.open(authPaths.login, "_self");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
