import axios from "axios";

// Configuramos la direccion correcta del servidor
const apiConfig =  axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json'
    }
});
// Agregado de seguridad Token
apiConfig.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token_agenda'); // busca tu codig de seguridad
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Lo pega en el envio
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
export default apiConfig;