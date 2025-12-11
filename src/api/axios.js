// src/api/axios.js
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("contestHub-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⬇️ এই লাইনটা নতুন – named export
export { api };

// ⬇️ আগে যেমন ছিল – default export
export default api;
