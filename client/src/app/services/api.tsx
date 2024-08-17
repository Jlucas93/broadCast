import axios from 'axios';
import nookies from 'nookies';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3333/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? nookies.get(null)['@token']
      : nookies.get(config.headers.cookie)['@token'];

  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
  }

  return config;
});

export default api;
