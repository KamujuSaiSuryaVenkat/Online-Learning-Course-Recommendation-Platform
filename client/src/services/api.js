import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('lf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('lf_token');
      localStorage.removeItem('lf_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const courseAPI = {
  getAll: (params) => API.get('/courses', { params }),
  getById: (id) => API.get(`/courses/${id}`),
  getFeatured: () => API.get('/courses/featured'),
};

export const enrollmentAPI = {
  enroll: (courseId) => API.post(`/enrollments/${courseId}`),
  getMyEnrollments: () => API.get('/enrollments/my'),
  checkEnrollment: (courseId) => API.get(`/enrollments/check/${courseId}`),
};

export const progressAPI = {
  get: (courseId) => API.get(`/progress/${courseId}`),
  update: (courseId, data) => API.put(`/progress/${courseId}`, data),
  getSummary: () => API.get('/progress/summary'),
};

export const recommendationAPI = {
  get: () => API.get('/recommendations'),
};

export const userAPI = {
  getLeaderboard: () => API.get('/users/leaderboard'),
};

export default API;
