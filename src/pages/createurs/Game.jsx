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
import { Coins, Users, Lock } from "lucide-react";

const GamePage = () => {
  const { id_deck } = useParams();
  const { user } = useAuth();

  const [deckCards, setDeckCards] = useState([]);
  const [titleDeck, setTitleDeck] = useState("");
  const [description, setDescription] = useState("");
  const [creatorCard, setCreatorCard] = useState(null);
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardFlipStates, setCardFlipStates] = useState({});

  const fetchDeckData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Récupération des cartes du deck
      const cardsData = await getAllCardInLiveDeck(id_deck);
      console.log(cardsData);
      setTitleDeck(cardsData.titleDeck);
      setDescription(cardsData.descriptionDeck);

      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setDeckCards(sortedCards);

      // Récupération de la carte de l'utilisateur
      let creatorCardData = null;
      let randomCardData = null;

      if (user?.id) {
        creatorCardData = await getCreatorCard(id_deck, user.id);
        const hasRandomCard = await checkIfCreatorHasRandomCardInDeck(
          id_deck,
          user.id
        );

        if (hasRandomCard?.card) {
          randomCardData = hasRandomCard.card;
        } else {
          const assignedCard = await assignRandomCardToCreator(
            id_deck,
            user.id
          );
          randomCardData = assignedCard?.card || null;
        }
      }

      // Initialisation des états de flip uniquement pour la carte créateur et la carte aléatoire
      const initialFlipStates = {};
      if (creatorCardData?.card) {
        initialFlipStates[creatorCardData.card.id_carte] = false;
      }
      if (randomCardData) {
        initialFlipStates[randomCardData.id_carte] = false;
      }
      setCardFlipStates(initialFlipStates);

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

  const handleCardFlip = (cardId) => {
    // Vérifie si la carte peut être retournée (carte créateur ou aléatoire)
    if (
      (creatorCard && cardId === creatorCard.id_carte) ||
      (randomCard && cardId === randomCard.id_carte)
    ) {
      setCardFlipStates((prev) => ({
        ...prev,
        [cardId]: !prev[cardId],
      }));
    }
  };

  const renderCard = (card, isFlippable = false) => {
    const isCreatorCard = creatorCard && card.id_carte === creatorCard.id_carte;
    const isRandomCard = randomCard && card.id_carte === randomCard.id_carte;
    const canFlip = isFlippable && (isCreatorCard || isRandomCard);

    return (
      <div
        key={card.id_carte}
        className={`card-wrapper ${
          cardFlipStates[card.id_carte] ? "card-wrapper--flipped" : ""
        } ${canFlip ? "flippable" : "locked"}`}
        onClick={() => canFlip && handleCardFlip(card.id_carte)}
      >
        <div className="card-content">
          <div className="card-front">
            <h3>
              {isCreatorCard
                ? "Votre carte"
                : isRandomCard
                ? "Votre carte aléatoire"
                : "Carte du deck"}
            </h3>
            {canFlip ? (
              <p>
                Cliquez pour révéler{" "}
                <i className="fa-solid fa-arrow-rotate-right"></i>
              </p>
            ) : (
              <div className="locked-card">
                <Lock size={24} />
                <p>Carte verrouillée</p>
              </div>
            )}
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
              {isCreatorCard && " (Votre carte)"}
              {isRandomCard && " (Votre carte aléatoire)"}
            </p>
          </div>
        </div>
      </div>
    );
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

      <div className="deck-container">
        {deckCards.map((card) => renderCard(card, true))}
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
