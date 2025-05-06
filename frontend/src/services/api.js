import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-1-backend.onrender.com/api", // backend base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
