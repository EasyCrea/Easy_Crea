import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // Important pour envoyer des cookies ou des informations d'identification
});

// Intercepteur pour ajouter le token JWT dans les en-têtes
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
      // Rediriger l'utilisateur si le token est invalide ou manquant
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
