import axios from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  msg?: string;
  detail?: string;
  errors?: Array<{ msg: string }>;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse;

    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (data?.msg) return data.msg;
    if (data?.detail) return data.detail;
    if (data?.errors?.[0]?.msg) return data.errors[0].msg;
    if (error.response?.statusText) return error.response.statusText;

    return `Server error: ${error.response?.status || "Unknown"}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};
