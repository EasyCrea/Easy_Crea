//  Gestion des demandes utilisateurs
// ['POST', '/createur', 'createur@createCard'],
// [‘GET’, ‘/createur’,'createur@getAllDeck'],
// [‘GET’, ‘/createur/card’,'createur@getRandomCard'],

import API from "./api";

// Gestion des demandes utilisateurs

export const createCard = async (data) => {
  const response = await API.post("/createur", data);
  return response.data;
};

export const getAllDeck = async () => {
  const response = await API.get("/createur");
  return response.data;
};

export const getRandomCard = async () => {
  const response = await API.get("/createur/card");
  return response.data;
};
