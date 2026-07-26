import axios from 'axios';

// Safe baseURL configuration for Next.js build & runtime
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ai-gateway-backend-lime.vercel.app/api/v1';
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Backend ke credentials/cookies allow karne ke liye lazmi hai
});

// Pass Auth token automatically
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('gateway_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (data) => API.post('/auth/register', data),
  getProfile: () => API.get('/auth/me'),
};

export const keysAPI = {
  getKeys: () => API.get('/keys'),
  createKey: (name) => API.post('/keys', { name }),
  updateKey: (id, data) => API.put(`/keys/${id}`, data),
  deleteKey: (id) => API.delete(`/keys/${id}`),          
};

export default API;