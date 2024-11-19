import API from "./api";

// Gestion de l'authentification pour les créateurs
export const loginCreateur = async (email, password) => {
  try {
    const response = await API.post("/createurs/login", { email, password });

    if (response.data && response.data.token) {
      console.log("Utilisateur authentifié :", response.data);
      return response.data; // Le serveur doit fournir le token
    } else {
      throw new Error("Authentification échouée : réponse invalide.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
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
      console.log("Utilisateur authentifié :", response.data);
      return response.data; // Le serveur doit fournir le token
    } else {
      throw new Error("Authentification échouée : réponse invalide.");
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
