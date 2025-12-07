// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("contestHub-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
