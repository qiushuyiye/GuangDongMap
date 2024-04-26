import axios from 'axios';

const instance = axios.create({
    //   baseURL: '/api',
    baseURL: 'http://localhost:8081',
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        "platform": "H5"
    },
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
