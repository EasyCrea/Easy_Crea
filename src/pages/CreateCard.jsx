import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCardToDeck } from "../api/admins";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const CreateCard = ({ id_deck, onCardCreated }) => {
  const { user } = useAuth();
  const [eventDescription, setEventDescription] = useState("");
  const [choice1, setChoice1] = useState("");
  const [populationImpact1, setPopulationImpact1] = useState("");
  const [financeImpact1, setFinanceImpact1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [populationImpact2, setPopulationImpact2] = useState("");
  const [financeImpact2, setFinanceImpact2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateImpact = (value) => {
    const num = Number(value);
    return !isNaN(num) && num >= -10 && num <= 10;
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();

    // Convertir les valeurs en nombres pour la validation
    const p1 = Number(populationImpact1);
    const f1 = Number(financeImpact1);
    const p2 = Number(populationImpact2);
    const f2 = Number(financeImpact2);

    if (
      !eventDescription ||
      !choice1 ||
      !choice2 ||
      !validateImpact(p1) ||
      !validateImpact(f1) ||
      !validateImpact(p2) ||
      !validateImpact(f2)
    ) {
      setError(
        "Tous les champs sont obligatoires et les impacts doivent être entre -10 et 10."
      );
      return;
    }

    setLoading(true);

    try {
      await addCardToDeck(id_deck, {
        id_createur: user?.id || null,
        id_administrateur: user?.role === "admin" ? user?.id : null,
        event_description: eventDescription,
        choice_1: choice1,
        population_impact_1: p1,
        finance_impact_1: f1,
        choice_2: choice2,
        population_impact_2: p2,
        finance_impact_2: f2,
      });
      onCardCreated();
    } catch (err) {
      console.error("Erreur lors de la création de la carte :", err);
      setError("Une erreur est survenue lors de la création de la carte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-card-container">
      <form className="form-container createCard" onSubmit={handleCreateCard}>
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Créer une carte</h2>
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription" className="form-label required">
            Description de l&apos;événement
          </label>
          <textarea
            id="eventDescription"
            className="form-input"
            placeholder="Décrivez l'événement de la carte"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="choice1" className="form-label required">
            Choix 1
          </label>
          <input
            type="text"
            id="choice1"
            className="form-input"
            placeholder="Entrez le texte du premier choix"
            value={choice1}
            onChange={(e) => setChoice1(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="populationImpact1" className="form-label required">
            Impact sur la population (Choix 1) [-10 à 10]
          </label>
          <select
            id="populationImpact1"
            className="form-input"
            value={populationImpact1}
            onChange={(e) => setPopulationImpact1(e.target.value)}
            required
          >
            <option value="">Sélectionnez une valeur</option>
            {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="financeImpact1" className="form-label required">
            Impact sur les finances (Choix 1) [-10 à 10]
          </label>
          <select
            id="financeImpact1"
            className="form-input"
            value={financeImpact1}
            onChange={(e) => setFinanceImpact1(e.target.value)}
            required
          >
            <option value="">Sélectionnez une valeur</option>
            {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="choice2" className="form-label required">
            Choix 2
          </label>
          <input
            type="text"
            id="choice2"
            className="form-input"
            placeholder="Entrez le texte du deuxième choix"
            value={choice2}
            onChange={(e) => setChoice2(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="populationImpact2" className="form-label required">
            Impact sur la population (Choix 2) [-10 à 10]
          </label>
          <select
            id="populationImpact2"
            className="form-input"
            value={populationImpact2}
            onChange={(e) => setPopulationImpact2(e.target.value)}
            required
          >
            <option value="">Sélectionnez une valeur</option>
            {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="financeImpact2" className="form-label required">
            Impact sur les finances (Choix 2) [-10 à 10]
          </label>
          <select
            id="financeImpact2"
            className="form-input"
            value={financeImpact2}
            onChange={(e) => setFinanceImpact2(e.target.value)}
            required
          >
            <option value="">Sélectionnez une valeur</option>
            {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="login-form__error">{error}</p>}
        <button type="submit" className="btn btn-cta" disabled={loading}>
          {loading ? "Chargement..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
