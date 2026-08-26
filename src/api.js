import axios from 'axios';
const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
export const getApiAssetUrl = (path) => {
  if (!path || /^https?:\/\//i.test(path)) return path;
  const apiOrigin = API_BASE_URL.replace(/\/api$/, '');
  return `${apiOrigin}/${path.replace(/^\//, '')}`;
};
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});
// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, config.data);
  return config;
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default API;
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  verify: () => API.get('/auth/verify'),
};
export const galleryAPI = {
  getAll: () => API.get('/gallery'),
  create: (formData) =>
    API.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/gallery/${id}`),
};
export const announcementsAPI = {
  getAll: () => API.get('/announcements'),
  create: (data) => API.post('/announcements', data),
  update: (id, data) => API.put(`/announcements/${id}`, data),
  delete: (id) => API.delete(`/announcements/${id}`),
};
export const careersAPI = {
  getAll: () => API.get('/careers'),
  create: (data) => API.post('/careers', data),
  update: (id, data) => API.put(`/careers/${id}`, data),
  delete: (id) => API.delete(`/careers/${id}`),
};

// Blog CRUD — list/detail are public; create/update/delete require the admin token
// (already attached automatically by the interceptor above).
export const blogAPI = {
  getAll: () => API.get('/blogs'),
  getBySlug: (slug) => API.get(`/blogs/${slug}`),
  getById: (id) => API.get(`/blogs/id/${id}`),
  create: (formData) =>
    API.post('/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/blogs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/blogs/${id}`),
};

// Video CRUD — list/detail are public; create/update/delete require the admin token
// (already attached automatically by the interceptor above). Supports either a
// YouTube/Vimeo link (sourceType: 'youtube') or a locally uploaded file (sourceType: 'upload').
export const videoAPI = {
  getAll: () => API.get('/videos'),
  getBySlug: (slug) => API.get(`/videos/${slug}`),
  getById: (id) => API.get(`/videos/id/${id}`),
  create: (formData) =>
    API.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/videos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/videos/${id}`),
};