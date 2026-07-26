import axios from 'axios';

const API = axios.create({
  // Ab hum direct backend URL ki bajaye apna relative path ya proxy use karenge
  baseURL: '/api/v1', 
  withCredentials: true,
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