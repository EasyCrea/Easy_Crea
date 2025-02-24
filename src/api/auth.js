import API from "./api";

// Fonction de récupération du token dans le localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Gestion de l'authentification pour les créateurs
export const loginCreateur = async (email, password) => {
  try {
    const response = await API.post("/createurs/login", { email, password });

    if (response.data && response.data.token) {
      return response.data; // Le serveur doit fournir le token
    }
  } catch (error) {
    console.error("Les identifiants fournis sont incorrects :", error.message);
    throw error; // Propager l'erreur pour que l'appelant puisse la gérer
  }
};

export const registerCreateur = async (data) => {
  const response = await API.post("/createurs/register", data);
  return response.data;
};

export const logoutCreateur = async () => {
  const response = await API.get("/createurs/logout");
  return response.data;
};

// Gestion de l'authentification pour les admins
export const loginAdmin = async (email, password) => {
  try {
    const response = await API.post("/admin/login", { email, password });

    if (response.data && response.data.token) {
      return response.data; // Le serveur doit fournir le token
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    throw error; // Propager l'erreur pour que l'appelant puisse la gérer
  }
};

export const registerAdmin = async (data) => {
  const response = await API.post("/admin/register", data);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await API.get("/admin/logout");
  return response.data;
};
