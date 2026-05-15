import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.warn("[api] 403 Forbidden:", error.config?.url);
    }

    if (status === 500) {
      console.error("[api] 500 Server Error:", error.config?.url);
    }

    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiMessage =
      error.response?.data?.message ??
      error.response?.data?.error ??
      null;

    if (apiMessage) return apiMessage;

    if (error.code === "ECONNABORTED") return "Request timeout. Coba lagi.";
    if (!error.response) return "Tidak dapat terhubung ke server.";
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}