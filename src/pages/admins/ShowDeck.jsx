import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import pour accéder aux paramètres de l'URL
import { useAuth } from "../../context/AuthContext";
import { getAllCardInDeck } from "../../api/admins";

const ShowDeck = () => {
  const { user } = useAuth();
  const { id_deck } = useParams(); // Récupérer l'ID du deck depuis l'URL
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]); // État pour les cartes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchDeck(id_deck); // Passer l'ID du deck
    }
  }, [user, id_deck]);

  const fetchDeck = async (id) => {
    setLoading(true);
    try {
      const data = await getAllCardInDeck(id); // Passer l'ID du deck à l'API
      console.log({ data });
      if (data.cards) {
        setCards(data.cards); // Mettre à jour les cartes
      }
      setDeck(data.deck || {}); // Mettre à jour les informations du deck
    } catch (error) {
      console.error("Erreur lors du chargement du deck :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement du deck...</p>;
  }

  if (!deck) {
    return <p>Deck non trouvé.</p>;
  }

  return (
    <div>
      <h1>{deck.titre_deck}</h1>
      <p>Nombre de cartes : {cards.length}</p>
      <h2>Cartes du deck :</h2>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card.id_carte}>
              <p>
                <strong>{card.texte_carte}</strong>
              </p>
              <p>Choix 1: {card.valeurs_choix1}</p>
              <p>Choix 2: {card.valeurs_choix2}</p>
            </li>
          ))
        ) : (
          <p>Aucune carte trouvée pour ce deck.</p>
        )}
      </ul>
    </div>
  );
};

export default ShowDeck;
