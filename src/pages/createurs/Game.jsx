import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllCardInLiveDeck, getCreatorCard } from "../../api/createurs";
import CreateCard from "../CreateCard";

const GamePage = () => {
  const { id_deck } = useParams();
  const { user } = useAuth();
  const [deckCards, setDeckCards] = useState([]);
  const [titleDeck, setTitleDeck] = useState("");
  const [creatorCard, setCreatorCard] = useState(null);
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const cardsGalleryRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    fetchDeckData();
  }, [id_deck, user]);

  useEffect(() => {
    if (deckCards.length > 0 && cardsGalleryRef.current) {
      arrangeCards();
    }
  }, [deckCards]);

  const arrangeCards = () => {
    const cardWrappers =
      cardsGalleryRef.current?.querySelectorAll(".card-wrapper") || [];
    const cardCount = cardWrappers.length;

    if (cardCount === 0) return;

    const maxAngle = Math.min(cardCount * 5, 30);

    cardWrappers.forEach((wrapper, index) => {
      const angle = maxAngle * (index / (cardCount - 1) - 0.5);
      const verticalOffset = Math.abs(angle) * 0.8;
      const offset = (index - (cardCount - 1) / 2) * 60;

      wrapper.style.setProperty("--angle", `${angle}deg`);
      wrapper.style.setProperty("--translation", `${verticalOffset}px`);
      wrapper.style.left = `calc(50% + ${offset}px - 140px)`;
      wrapper.style.zIndex = index;
    });
  };

  const handleCardFlip = (cardId) => {
    if (randomCard?.id_carte === cardId || creatorCard?.id_carte === cardId) {
      setFlippedCards((prev) => ({
        ...prev,
        [cardId]: !prev[cardId],
      }));
    }
  };

  const fetchDeckData = async () => {
    setLoading(true);
    try {
      const cardsData = await getAllCardInLiveDeck(id_deck);
      setTitleDeck(cardsData.titleDeck);
      const sortedCards = (cardsData.cards || []).sort(
        (a, b) => new Date(a.date_creation) - new Date(b.date_creation)
      );
      setDeckCards(sortedCards);

      if (user?.id) {
        const creatorCardData = await getCreatorCard(id_deck, user.id);
        setCreatorCard(creatorCardData.card || null);
      }

      if (sortedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * sortedCards.length);
        setRandomCard(sortedCards[randomIndex]);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="loading">Chargement de l'utilisateur...</p>;

  if (loading)
    return <p className="loading">Chargement des données du deck...</p>;

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="game-page">
      <div className="mystical-bg"></div>
      <h1 className="game-page__title">{titleDeck}</h1>

      <div className="deck-container">
        <h2 className="deck-title">Cartes du deck</h2>
        <div className="cards-gallery" ref={cardsGalleryRef}>
          {deckCards.map((card) => {
            const isRandom = card.id_carte === randomCard?.id_carte;
            const isCreator = card.id_carte === creatorCard?.id_carte;
            const isFlipped = flippedCards[card.id_carte];
            const isRevealed = isRandom || isCreator;

            return (
              <div
                key={card.id_carte}
                className={`card-wrapper ${
                  isRevealed ? "card-wrapper--revealed" : ""
                }`}
                onClick={() => handleCardFlip(card.id_carte)}
              >
                {/* Ajoutez votre contenu de carte ici */}
              </div>
            );
          })}
        </div>
      </div>

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
