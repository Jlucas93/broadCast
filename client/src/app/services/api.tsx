import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:3333/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('@webServer:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    }
  } catch (error) {
    console.error(error);
  }

  return config;
});

export default api;
