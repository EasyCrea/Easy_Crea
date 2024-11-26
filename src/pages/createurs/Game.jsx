import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllCardInLiveDeck, getCreatorCard } from "../../api/createurs";
import CreateCard from "../CreateCard";

const GamePage = () => {
  const { id_deck } = useParams();
  const { user } = useAuth();
  const [deckCards, setDeckCards] = useState([]);
  const [titleDeck, setTitleDeck] = useState("");
  const [creatorCard, setCreatorCard] = useState(null);
  const [visibleCard, setVisibleCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const fetchDeckData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const cardsData = await getAllCardInLiveDeck(id_deck);
      setTitleDeck(cardsData.titleDeck);

      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.date_creation) - new Date(b.date_creation)
      );
      setDeckCards(sortedCards);

      // Sélectionner une carte aléatoire du deck
      if (sortedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * sortedCards.length);
        setVisibleCard(sortedCards[randomIndex]);
      }

      // Vérifier si l'utilisateur a déjà créé une carte
      if (user?.id) {
        const creatorCardData = await getCreatorCard(id_deck, user.id);
        setCreatorCard(creatorCardData.card || null);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  }, [id_deck, user]);

  useEffect(() => {
    fetchDeckData();
  }, [fetchDeckData]);

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
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
      <div className="mystical-bg"></div>
      <h1 className="game-page__title">{titleDeck}</h1>

      <div className="deck-container">
        <h2 className="deck-title">Carte du Deck</h2>

        {visibleCard && (
          <div
            className={`card-wrapper ${
              isCardFlipped ? "card-wrapper--flipped" : ""
            }`}
            onClick={handleCardFlip}
          >
            <div className="card-content">
              <div className="card-front">
                <h3>Carte du Deck</h3>
                <p>Cliquez pour révéler</p>
              </div>

              <div className="card-back">
                <h3>{visibleCard.texte_carte}</h3>
                <div className="card-choices">
                  <div className="choice">
                    <strong>Choix 1:</strong> {visibleCard.valeurs_choix1}
                  </div>
                  <div className="choice">
                    <strong>Choix 2:</strong> {visibleCard.valeurs_choix2}
                  </div>
                </div>
                <p className="card-metadata">
                  Créée le:{" "}
                  {new Date(visibleCard.date_creation).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!creatorCard && (
        <div className="create-card-container">
          <h3>Créez votre première carte pour ce deck :</h3>
          <CreateCard id_deck={id_deck} onCardCreated={fetchDeckData} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
