//  Gestion des decks
// ['POST', '/admin', 'admin@createDeck'],
// ['POST', '/admin/firstcard', 'admin@createFirstCard'],
// [‘GET’, ‘/admin’,'admin@getAllDeck'],
// [‘PATCH, '/admin/deck/{id:\d+}}'', admin@editById'],
// ['DELETE, '/admin/{id:\d+}'', admin@deleteById'],
// ['PATCH', '/admin/deactivate/{id:\d+}', 'admin@deactivate'],
// ['PATCH', '/admin/activate/{id:\d+}', 'admin@activate'],

//  Gestion des cartes dans les decks
// [‘GET’, ‘/admin/deck/{id:\d+}’’,'admin@getAllCardInDeck'],
// [‘GET’, ‘/admin/card/{id:\d+}’’,'admin@getCardById'],
// [‘PATCH, '/admin/edit/{id:\d+}}'', admin@editCardById'],
// ['DELETE, '/admin/delete/{id:\d+}'', admin@deleteCardById'],

import API from "./api";
import { getAuthToken } from "./auth";

// Gestion des decks

export const createDeck = async (data) => {
  const response = await API.post("/admin/createDeck", data);
  return response.data;
};

export const createFirstCard = async (data) => {
  const response = await API.post("/admin/firstcard", data);
  return response.data;
};

export const getAllDeck = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const editById = async (id, data) => {
  const response = await API.patch(`/admin/deck/${id}`, data);
  return response.data;
};

export const deleteById = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await API.delete(`/admin/delete/deck/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    throw error;
  }
};

export const deactivateDeck = async (id) => {
  const response = await API.patch(`/admin/deactivate/${id}`);
  return response.data;
};

export const activateDeck = async (id) => {
  const response = await API.patch(`/admin/activate/${id}`);
  return response.data;
};

// Gestion des cartes dans les decks

export const getAllCardInDeck = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await API.get(`/admin/deck/${id}`, {
      // Utilisation de l'ID pour la requête
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data; // Retourner les données du deck
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes du deck :", error);
    throw error;
  }
};

export const getCardById = async (id) => {
  const response = await API.get(`/admin/card/${id}`);
  return response.data;
};

export const editCardById = async (id, data) => {
  const response = await API.patch(`/admin/edit/${id}`, data);
  return response.data;
};

export const deleteCardById = async (id) => {
  const response = await API.delete(`/admin/delete/${id}`);
  return response.data;
};
