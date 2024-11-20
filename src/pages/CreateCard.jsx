// Component Name: CreateCard

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCardToDeck } from "../api/admins";
import { useAuth } from "../context/AuthContext";

const CreateCard = () => {
  const { user } = useAuth();
  const { id_deck } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCard = async (e) => {
    e.preventDefault();

    if (!question || !answer) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      await addCardToDeck(id_deck, { question, answer });
      navigate(`/deck/${id_deck}`);
    } catch (error) {
      console.error("Erreur lors de la création de la carte :", error);
      alert("Une erreur est survenue lors de la création de la carte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-card">
      <h2 className="create-card__title">Créer une carte</h2>
      <form className="create-card__form" onSubmit={handleCreateCard}>
        <div className="create-card__group">
          <label htmlFor="question" className="create-card__label">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="create-card__input"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="create-card__group">
          <label htmlFor="answer" className="create-card__label">
            Réponse
          </label>
          <input
            type="text"
            id="answer"
            className="create-card__input"
            placeholder="Réponse"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="create-card__button"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
