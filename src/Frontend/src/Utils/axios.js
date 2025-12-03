import axiosLib from "axios";

const baseURL = 'http://localhost:5215/api';

const axios = axiosLib.create({
  baseURL,
  timeout: 10000,
});

// Interceptor para enviar token automaticamente
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
