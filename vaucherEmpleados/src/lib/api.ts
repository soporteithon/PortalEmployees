import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// El backend de NestJS está configurado con prefijo 'api'
export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Interceptor para inyectar el token JWT
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
