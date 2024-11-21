import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import { useAuth } from "../../context/AuthContext";
import { getAllCardInDeck, deleteCardById } from "../../api/admins"; // Assurez-vous que deleteCard est bien défini

const ShowDeck = () => {
  const { user } = useAuth();
  const { id_deck } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook pour la navigation

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

  const handleEditCard = (cardId) => {
    navigate(`/edit-card/${cardId}`); // Redirige vers la page de modification de la carte
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette carte ?"
    );
    if (confirmDelete) {
      try {
        await deleteCardById(cardId); // Suppression de la carte via l'API
        alert("Carte supprimée avec succès.");
        setCards(cards.filter((card) => card.id_carte !== cardId)); // Met à jour l'état des cartes après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la carte :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  const handleCreateCard = (id_deck) => {
    navigate(`/create-card/${id_deck}`); // Redirige vers la page de création de carte
  };

  if (loading) {
    return <p className="loading">Chargement du deck...</p>;
  }

  if (!deck) {
    return (
      <>
        <p className="error-message">Deck non trouvé.</p>
        <button
          onClick={() => handleCreateCard(id_deck)}
          className="btn btn-create"
        ></button>
      </>
    );
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
                <div className="card-actions">
                  <button
                    onClick={() => handleEditCard(card.id_carte)}
                    className="btn btn-edit"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id_carte)}
                    className="btn btn-delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <>
            <p className="error-message">Aucune carte trouvée pour ce deck.</p>
          </>
        )}
      </ul>
    </div>
  );
};

export default ShowDeck;
