import axios from "axios";




const vaucherApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


vaucherApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);



//TODO INTERCEPTORES
//Los interceptores son funciones que se ejecutan antes de que una petición sea enviada o antes de que una respuesta sea recibida
//

export { vaucherApi };