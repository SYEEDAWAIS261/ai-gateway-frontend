import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
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
  updateKey: (id, data) => API.put(`/keys/${id}`, data), // <- New Update API method
  deleteKey: (id) => API.delete(`/keys/${id}`),          // <- Revoke replaced with deleteKey
};

export default API;