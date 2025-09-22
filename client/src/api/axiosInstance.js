// src/api/axiosInstance.js
import axios from "axios";

// Main axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token instance (no interceptors)
const refreshInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach access token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 or 403 (access token expired)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await refreshInstance.post("token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("access_token", res.data.access);
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
