import API from "./api";

// Gestion de l'authentification pour les créateurs
export const loginCreateur = async (email, password) => {
  const response = await API.post("/createurs/login", { email, password });
  return response.data; // Contient le token et les informations utilisateur
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
  const response = await API.post("/admin/login", { email, password });
  return response.data; // Contient le token et les informations utilisateur
};

export const registerAdmin = async (data) => {
  const response = await API.post("/admin/register", data);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await API.get("/admin/logout");
  return response.data;
};
