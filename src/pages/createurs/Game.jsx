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
  const [visibleCards, setVisibleCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardFlipStates, setCardFlipStates] = useState({});

  const fetchDeckData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const cardsData = await getAllCardInLiveDeck(id_deck);
      setTitleDeck(cardsData.titleDeck);

      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setDeckCards(sortedCards);

      // If user has a card in this deck, fetch it
      if (user?.id) {
        const creatorCardData = await getCreatorCard(id_deck, user.id);
        const userCreatorCard = creatorCardData.card || null;
        setCreatorCard(userCreatorCard);

        // Determine visible cards
        const visibleCardsSet = new Set();

        // Always add a random card from the deck
        if (sortedCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * sortedCards.length);
          visibleCardsSet.add(sortedCards[randomIndex]);
        }

        // If user has created a card, add it to visible cards
        if (userCreatorCard) {
          visibleCardsSet.add(userCreatorCard);
        }

        const visibleCardsArray = Array.from(visibleCardsSet);
        setVisibleCards(visibleCardsArray);

        // Initialize flip states for cards
        const initialFlipStates = visibleCardsArray.reduce((acc, card) => {
          acc[card.id_carte] = false;
          return acc;
        }, {});
        setCardFlipStates(initialFlipStates);
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

  const handleCardCreated = () => {
    fetchDeckData(); // Recharge les données
  };

  const handleCardFlip = (cardId) => {
    setCardFlipStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  if (!user) {
    return <p className="loading">Chargement de l&apos;utilisateur...</p>;
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

      <div
        className={`deck-container ${
          creatorCard ? "dual-cards" : "single-card"
        }`}
      >
        {visibleCards.map((card) => (
          <div
            key={card.id_carte}
            className={`card-wrapper ${
              cardFlipStates[card.id_carte] ? "card-wrapper--flipped" : ""
            }`}
            onClick={() => handleCardFlip(card.id_carte)}
          >
            <div className="card-content">
              <div className="card-front">
                <h3>Carte du Deck</h3>
                <p>Cliquez pour révéler</p>
              </div>

              <div className="card-back">
                <h3>{card.event_description}</h3>
                <div className="card-choices">
                  <div className="choice">
                    <strong>Choix 1:</strong> {card.choice_1}
                    <p>Impact Population : {card.population_impact_1}</p>
                    <p>Impact Financier : {card.finance_impact_1}</p>
                  </div>
                  <div className="choice">
                    <strong>Choix 2:</strong> {card.choice_2}
                    <p>Impact Population : {card.population_impact_2}</p>
                    <p>Impact Financier : {card.finance_impact_2}</p>
                  </div>
                </div>
                <p className="card-metadata">
                  Créée le: {new Date(card.created_at).toLocaleDateString()}
                  {card.id_carte === creatorCard?.id_carte && " (Votre carte)"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!creatorCard && (
        <div className="create-card-container">
          <h3>Créez votre première carte pour ce deck :</h3>
          <CreateCard id_deck={id_deck} onCardCreated={handleCardCreated} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
