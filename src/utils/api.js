import axios from 'axios';

// Базовый URL для Laravel API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Добавляем токен авторизации к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обрабатываем ошибки ответа
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен недействителен, перенаправляем на логин
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API методы для аутентификации
export const authAPI = {
  login: (email, password) => 
    api.post('/login', { email, password }),
  
  register: (name, email, password, passwordConfirmation) =>
    api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  
  logout: () => api.post('/logout'),
};

// API методы для категорий
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (name, color) => api.post('/categories', { name, color }),
  update: (id, name, color) => api.put(`/categories/${id}`, { name, color }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// API методы для задач
export const tasksAPI = {
  getAll: (categoryId = null) => {
    const params = categoryId ? { category_id: categoryId } : {};
    return api.get('/tasks', { params });
  },
  getById: (id) => api.get(`/tasks/${id}`),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  delete: (id) => api.delete(`/tasks/${id}`),
  toggleComplete: (id) => api.patch(`/tasks/${id}/toggle`),
};

export default api;
