import API from "./api";
import { getAuthToken } from "./auth";

// Fonction utilitaire pour récupérer le token
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Token d'authentification manquant");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Permet d'inclure les cookies si nécessaire
  };
};

// Gestion des decks

export const createDeck = async (data) => {
  const response = await API.post("/admin/createDeck", data, getAuthHeaders());
  return response.data;
};

export const createFirstCard = async (data) => {
  const response = await API.post("/admin/firstcard", data, getAuthHeaders());
  return response.data;
};

export const getAllDeck = async () => {
  const response = await API.get("/admin/dashboard", getAuthHeaders());
  return response.data;
};

export const editById = async (id, data) => {
  const response = await API.patch(`/admin/deck/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteById = async (id) => {
  try {
    const response = await API.delete(
      `/admin/delete/deck/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    throw error;
  }
};

export const deactivateDeck = async (id) => {
  const response = await API.patch(
    `/admin/deactivate/${id}`,
    null,
    getAuthHeaders()
  );
  return response.data;
};

export const activateDeck = async (id) => {
  const response = await API.patch(
    `/admin/activate/${id}`,
    null,
    getAuthHeaders()
  );
  return response.data;
};

export const getLiveDeck = async () => {
  const response = await API.get("/createur/liveDeck", getAuthHeaders());
  return response.data;
};
// Gestion des cartes dans les decks

export const addCardToDeck = async (id, data) => {
  const response = await API.post(`/createCard${id}`, data, getAuthHeaders());
  return response.data;
};

export const getAllCardInDeck = async (id) => {
  try {
    const response = await API.get(`/admin/deck/${id}`, getAuthHeaders());
    return response.data; // Retourner les données du deck
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes du deck :", error);
    throw error;
  }
};

export const getCardById = async (id) => {
  const response = await API.get(`/admin/card/${id}`, getAuthHeaders());
  return response.data;
};

export const editCardById = async (id, data) => {
  const response = await API.patch(
    `/admin/edit/card/${id}`,
    data,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteCardById = async (id) => {
  const response = await API.delete(
    `/admin/delete/card/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const banUser = async (id) => {
  const response = await API.patch(`/admin/ban/${id}`, null, getAuthHeaders());
  return response.data;
};

export const getAllUsers = async () => {
  const response = await API.get("/admin/createurs", getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(
    `/admin/deleteCreateur/${id}`,
    getAuthHeaders()
  );
  return response.data;
};
