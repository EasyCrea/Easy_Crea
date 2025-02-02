import axios from "axios";

const API = axios.create({
  baseURL: "https://easydeck.alwaysdata.net/api",
  withCredentials: true, // Important pour envoyer des cookies ou des informations d'identification
});
//https://easydeck.alwaysdata.net/api
//http://localhost:8000
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
      console.error("Erreur 401 : non autorisé");
    }
    return Promise.reject(error);
  }
);

export default API;
