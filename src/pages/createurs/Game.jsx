import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
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
  const [nbCartes, setNbCartes] = useState(0);
  const [creatorCard, setCreatorCard] = useState(null);
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardFlipStates, setCardFlipStates] = useState({});

  const updateFlipStates = useCallback((creatorCardData, randomCardData) => {
    const newFlipStates = {};
    if (creatorCardData?.card) {
      newFlipStates[creatorCardData.card.id_carte] = false;
    }
    if (randomCardData) {
      newFlipStates[randomCardData.id_carte] = false;
    }
    setCardFlipStates(newFlipStates);
  }, []);

  const fetchDeckData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const cardsData = await getAllCardInLiveDeck(id_deck);
      setTitleDeck(cardsData.titleDeck);
      setDescription(cardsData.descriptionDeck);
      setNbCartes(cardsData.nb_cartes);

      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setDeckCards(sortedCards);

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
          if (assignedCard?.card) {
            randomCardData = assignedCard.card;
            sortedCards.push(assignedCard.card);
            setDeckCards([...sortedCards]);
          }
        }

        updateFlipStates(creatorCardData, randomCardData);
        setCreatorCard(creatorCardData?.card || null);
        setRandomCard(randomCardData || null);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  }, [id_deck, user, updateFlipStates]);

  useEffect(() => {
    fetchDeckData();
  }, [fetchDeckData]);

  if (user && user.banned === 1) {
    return <Navigate to="/banned" />;
  }

  const handleCardFlip = (cardId) => {
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
        className={`deck-container card-wrapper ${
          cardFlipStates[card.id_carte] ? "card-wrapper--flipped" : ""
        } ${canFlip ? "flippable" : "locked"}`}
        onClick={() => canFlip && handleCardFlip(card.id_carte)}
      >
        <div className="card-content">
          {/* Front de la carte */}
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

          {/* Back de la carte */}
          <div className="card-back">
            <h3>{card.event_description}</h3>
            <div className="card-choices">
              <div className="choice">
                <strong>Choix 1</strong>
                <p>{card.choice_1}</p>
                <div className="impact">
                  <div className="impact-item">
                    <Users size={16} className="impact-icon population" />
                    <span className="impact-value population">
                      {card.population_impact_1}
                    </span>
                  </div>
                  <div className="impact-item">
                    <Coins size={16} className="impact-icon finance" />
                    <span className="impact-value finance">
                      {card.finance_impact_1}
                    </span>
                  </div>
                </div>
              </div>

              <div className="choice">
                <strong>Choix 2</strong>
                <p>{card.choice_2}</p>
                <div className="impact">
                  <div className="impact-item">
                    <Users size={16} className="impact-icon population" />
                    <span className="impact-value population">
                      {card.population_impact_2}
                    </span>
                  </div>
                  <div className="impact-item">
                    <Coins size={16} className="impact-icon finance" />
                    <span className="impact-value finance">
                      {card.finance_impact_2}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-metadata">
              Créée le {new Date(card.created_at).toLocaleDateString()}
            </div>
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

      {deckCards.length >= nbCartes && (
        <div className="limit-reached-message">
          Le nombre maximum de cartes pour ce deck a été atteint.
        </div>
      )}

      <div className="deck-container">
        {deckCards.map((card) => renderCard(card, true))}
      </div>

      {!creatorCard && deckCards.length < nbCartes && (
        <div className="create-card-container">
          <h3>Créez votre première carte pour ce deck :</h3>
          <CreateCard id_deck={id_deck} onCardCreated={fetchDeckData} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
