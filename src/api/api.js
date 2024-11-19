import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Intercepteur pour inclure le token JWT dans chaque requête
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globales
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Exemple : Rediriger l'utilisateur vers la page de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
