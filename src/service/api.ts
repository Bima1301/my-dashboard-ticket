import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: `/api`,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
        if (error.response?.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.href = '/login';
        }
    } catch (error) {
        console.log(error);
    }
    throw error;
}
)

export default api;