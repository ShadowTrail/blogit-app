import axios from "axios";

const NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000";

// Create an axios instance
const api = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});

// Add a request interceptor to include the JWT token if available
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
