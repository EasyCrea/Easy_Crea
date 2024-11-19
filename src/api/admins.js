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

// Gestion des decks

export const createDeck = async (data) => {
  const response = await API.post("/admin", data);
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
  const response = await API.delete(`/admin/${id}`);
  return response.data;
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
  const response = await API.get(`/admin/deck/${id}`);
  return response.data;
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
