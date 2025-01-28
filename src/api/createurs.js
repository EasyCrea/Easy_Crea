import API from "./api";
import { getAuthToken } from "./auth";
// Gestion des demandes utilisateurs

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
export const createCard = async (data) => {
  const response = await API.post("/createur", data);
  return response.data;
};

export const getAllCardInLiveDeck = async (id_deck) => {
  const response = await API.get(
    `/createur/liveDeckCards/${id_deck}`,
    getAuthHeaders()
  );
  return response.data;
};

export const getRandomCard = async () => {
  const response = await API.get("/createur/card");
  return response.data;
};

export const getCreatorCard = async (deckId, id_createur) => {
  const response = await API.get(
    `/createur/${deckId}/${id_createur}`,
    getAuthHeaders()
  );
  return response.data;
};

export const assignRandomCardToCreator = async (deckId, id_createur) => {
  const response = await API.post(
    `/createur/${deckId}/${id_createur}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const checkIfCreatorHasRandomCardInDeck = async (
  deckId,
  id_createur
) => {
  const response = await API.get(
    `/createur/${deckId}/${id_createur}/randomCard`,
    getAuthHeaders()
  );
  return response.data;
};

export const unassignRandomCardFromCreator = async (deckId, id_createur) => {
  const response = await API.delete(
    `/createur/${deckId}/${id_createur}/unassignrandomCard`,
    getAuthHeaders()
  );
  return response.data;
};

export const sendEmail = async (data) => {
  const response = await API.post("/sendEmail", data, getAuthHeaders());
  return response.data;
};
