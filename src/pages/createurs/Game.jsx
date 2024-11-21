import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllCardInLiveDeck, getCreatorCard } from "../../api/createurs";
import CreateCard from "../CreateCard";

const GamePage = () => {
  const { id_deck } = useParams(); // Récupère l'ID du deck depuis l'URL
  const { user } = useAuth(); // Récupère l'utilisateur connecté
  const [deckCards, setDeckCards] = useState([]);
  const [title_deck, setTitle_deck] = useState("");
  const [creatorCard, setCreatorCard] = useState(null);
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchDeckData();
    }
  }, [id_deck, user]);

  const fetchDeckData = async () => {
    setLoading(true);
    try {
      // Récupérer toutes les cartes du deck
      const cardsData = await getAllCardInLiveDeck(id_deck);
      const title_deck = cardsData.titleDeck;
      setTitle_deck(title_deck);
      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.date_creation) - new Date(b.date_creation)
      );
      setDeckCards(sortedCards);

      // Récupérer la carte créée par le créateur connecté
      if (user?.id) {
        const creatorCardData = await getCreatorCard(id_deck, user.id);
        setCreatorCard(creatorCardData.card || null);
      }

      // Choisir une carte aléatoire parmi le deck
      if (sortedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * sortedCards.length);
        setRandomCard(sortedCards[randomIndex]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="loading">Chargement de l'utilisateur...</p>;
  }

  if (loading) {
    return <p className="loading">Chargement des données du deck...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="game-page">
      <h1 className="game-page__title">{title_deck}</h1>

      <div className="deck-cards">
        <h2>Cartes du deck :</h2>
        <div className="cards-grid">
          {deckCards.map((card, index) => {
            const isRandom = card.id_carte === randomCard?.id_carte;
            const isCreator = card.id_carte === creatorCard?.id_carte;
            return (
              <div
                key={index}
                className={`card-frame ${
                  isRandom
                    ? "card-random"
                    : isCreator
                    ? "card-creator"
                    : "card-skeleton"
                }`}
              >
                {isRandom || isCreator ? (
                  // Afficher les données des cartes aléatoire ou de l'utilisateur
                  <div className="card-content">
                    <p>
                      <strong>Texte :</strong> {card.texte_carte}
                    </p>
                    <p>
                      <strong>Choix 1 :</strong> {card.valeurs_choix1}
                    </p>
                    <p>
                      <strong>Choix 2 :</strong> {card.valeurs_choix2}
                    </p>
                    {isRandom && <span className="label">Carte aléatoire</span>}
                    {isCreator && <span className="label">Votre carte</span>}
                  </div>
                ) : (
                  // Afficher un squelette pour les autres cartes
                  <div className="card-skeleton-content">
                    <p className="skeleton-text">Carte masquée</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Formulaire de création si aucune carte n'a été créée par l'utilisateur */}
      {!creatorCard && (
        <div className="create-card-container">
          <h3>Créez votre première carte pour ce deck :</h3>
          <CreateCard id_deck={id_deck} />
        </div>
      )}

      <div className="navigation-links">
        <Link to="/decks" className="btn btn-back">
          Retour aux decks
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
