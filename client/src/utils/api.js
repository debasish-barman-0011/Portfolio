// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
//   withCredentials: true
// });

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error('[API Error]', err.response?.status, err.message);
//     if (err.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
//       localStorage.removeItem('adminToken');
//       window.location.href = '/admin/login';
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err.response?.status, err.message);
    if (err.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default api;