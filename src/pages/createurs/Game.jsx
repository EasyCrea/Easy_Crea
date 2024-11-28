import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllCardInLiveDeck,
  getCreatorCard,
  assignRandomCardToCreator,
  checkIfCreatorHasRandomCardInDeck,
} from "../../api/createurs";
import CreateCard from "../CreateCard";
import { Coins, Users } from "lucide-react";

const GamePage = () => {
  const { id_deck } = useParams();
  const { user } = useAuth();

  const [deckCards, setDeckCards] = useState([]);
  const [titleDeck, setTitleDeck] = useState("");
  const [description, setDescription] = useState("");
  const [creatorCard, setCreatorCard] = useState(null);
  const [randomCard, setRandomCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardFlipStates, setCardFlipStates] = useState({});
  const [isRandomCardAssigned, setIsRandomCardAssigned] = useState(false);

  const fetchDeckData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Récupération des cartes du deck
      const cardsData = await getAllCardInLiveDeck(id_deck);
      console.log("Deck Cards Data:", cardsData);
      setTitleDeck(cardsData.titleDeck);
      setDescription(cardsData.descriptionDeck);

      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setDeckCards(sortedCards);

      let creatorCardData = null;
      let randomCardData = null;

      // Vérifie si l'utilisateur a créé une carte
      if (user?.id) {
        creatorCardData = await getCreatorCard(id_deck, user.id);
        console.log("Creator Card Data:", creatorCardData);

        // Si l'utilisateur n'a pas encore de carte attribuée aléatoirement
        const hasRandomCard = await checkIfCreatorHasRandomCardInDeck(
          id_deck,
          user.id
        );
        console.log("Has Random Card:", hasRandomCard);

        if (hasRandomCard?.card) {
          randomCardData = hasRandomCard.card;
        } else {
          const assignedCard = await assignRandomCardToCreator(
            id_deck,
            user.id
          );
          randomCardData = assignedCard?.card || null;

          // Mise à jour immédiate de l'état pour affichage en temps réel
          if (randomCardData) {
            setIsRandomCardAssigned(true);
            setRandomCard(randomCardData);
            setVisibleCards((prevVisibleCards) => [
              ...prevVisibleCards,
              randomCardData,
            ]);
            setCardFlipStates((prevFlipStates) => ({
              ...prevFlipStates,
              [randomCardData.id_carte]: false,
            }));
          }
        }
      }

      // Mise à jour des cartes visibles
      const visibleCardsSet = new Set();
      if (creatorCardData?.card) visibleCardsSet.add(creatorCardData.card);
      if (randomCardData) visibleCardsSet.add(randomCardData);

      const visibleCardsArray = Array.from(visibleCardsSet);
      setVisibleCards(visibleCardsArray);

      // Initialisation des états de flip des cartes
      const initialFlipStates = visibleCardsArray.reduce((acc, card) => {
        acc[card.id_carte] = false;
        return acc;
      }, {});
      setCardFlipStates(initialFlipStates);

      // Met à jour les états principaux
      setCreatorCard(creatorCardData?.card || null);
      setRandomCard(randomCardData || null);
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
    fetchDeckData(); // Recharge les données après création
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
      <h2 className="game-page__subtitle">{description}</h2>

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
                <h3>
                  {card.id_carte === creatorCard?.id_carte
                    ? "Votre carte"
                    : "Carte aléatoire du deck"}
                </h3>
                <p>
                  Cliquez pour révéler{" "}
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </p>
              </div>

              <div className="card-back">
                <h3>{card.event_description}</h3>
                <div className="card-choices">
                  <div className="choice">
                    <strong>Choix 1:</strong> {card.choice_1}
                    <div className="impact">
                      <p className="impact-item">
                        <Users size={22} className="impact-icon population" />
                        <span className="impact-label">Populations:</span>
                        <span className="impact-value">
                          {card.population_impact_1}
                        </span>
                      </p>
                      <p className="impact-item">
                        <Coins size={22} className="impact-icon finance" />
                        <span className="impact-label">Finances:</span>
                        <span className="impact-value">
                          {card.finance_impact_1}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="choice">
                    <strong>Choix 2:</strong> {card.choice_2}
                    <div className="impact">
                      <p className="impact-item">
                        <Users size={22} className="impact-icon population" />
                        <span className="impact-label">Populations:</span>
                        <span className="impact-value">
                          {card.population_impact_2}
                        </span>
                      </p>
                      <p className="impact-item">
                        <Coins size={22} className="impact-icon finance" />
                        <span className="impact-label">Finances:</span>
                        <span className="impact-value">
                          {card.finance_impact_2}
                        </span>
                      </p>
                    </div>
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
