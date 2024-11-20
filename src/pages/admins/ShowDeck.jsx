import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllCardInDeck } from "../../api/admins";

const ShowDeck = () => {
  const { user } = useAuth();
  const { id_deck } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchDeck(id_deck);
    }
  }, [user, id_deck]);

  const fetchDeck = async (id) => {
    setLoading(true);
    try {
      const data = await getAllCardInDeck(id);
      if (data.cards) {
        setCards(data.cards);
      }
      setDeck(data.deck || {});
    } catch (error) {
      console.error("Erreur lors du chargement du deck :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading">Chargement du deck...</p>;
  }

  if (!deck) {
    return <p className="error-message">Deck non trouvé.</p>;
  }

  return (
    <div className="show-deck">
      <h1 className="show-deck__title">{deck.titre_deck}</h1>
      <p className="show-deck__info">Nombre de cartes : {cards.length}</p>
      <h2 className="show-deck__subtitle">Cartes du deck :</h2>
      <ul className="card-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card.id_carte} className="card-list__item">
              <div className="card">
                <p className="card__text">
                  <strong>{card.texte_carte}</strong>
                </p>
                <p className="card__choice">Choix 1: {card.valeurs_choix1}</p>
                <p className="card__choice">Choix 2: {card.valeurs_choix2}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="error-message">Aucune carte trouvée pour ce deck.</p>
        )}
      </ul>
    </div>
  );
};

export default ShowDeck;
