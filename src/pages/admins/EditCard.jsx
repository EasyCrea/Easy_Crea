import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById, editCardById } from "../../api/admins";

const EditCard = () => {
  const { id_carte } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCard(id_carte);
  }, [id_carte]);

  const fetchCard = async (id) => {
    setLoading(true);
    try {
      const response = await getCardById(id);
      setCard(response.card || {});
    } catch (error) {
      console.error("Erreur lors de la récupération de la carte :", error);
      setError("Une erreur est survenue lors du chargement de la carte.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCardById(id_carte, card);
      alert("Carte mise à jour avec succès.");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la carte :", error);
      setError("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: Number(value),
    }));
  };

  if (loading) {
    return <p className="loading">Chargement des détails de la carte...</p>;
  }

  if (!card) {
    return <p className="error-message">Carte non trouvée.</p>;
  }

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Modifier la carte</h2>

        {/* CHOIX 1 */}
        <div className="form-group">
          <label htmlFor="choice_1" className="form-label required">
            Choix 1 :
          </label>
          <input
            type="text"
            id="choice_1"
            name="choice_1"
            value={card.choice_1 || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="population_impact_1" className="form-label required">
            Impact sur la population (Choix 1) [-10 à 10]
          </label>
          <select
            id="population_impact_1"
            name="population_impact_1"
            className="form-input"
            value={card.population_impact_1 ?? ""}
            onChange={handleChange}
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
          <label htmlFor="finance_impact_1" className="form-label required">
            Impact sur les finances (Choix 1) [-10 à 10]
          </label>
          <select
            id="finance_impact_1"
            name="finance_impact_1"
            className="form-input"
            value={card.finance_impact_1 ?? ""}
            onChange={handleChange}
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

        {/* CHOIX 2 */}
        <div className="form-group">
          <label htmlFor="choice_2" className="form-label required">
            Choix 2 :
          </label>
          <input
            type="text"
            id="choice_2"
            name="choice_2"
            value={card.choice_2 || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="population_impact_2" className="form-label required">
            Impact sur la population (Choix 2) [-10 à 10]
          </label>
          <select
            id="population_impact_2"
            name="population_impact_2"
            className="form-input"
            value={card.population_impact_2 ?? ""}
            onChange={handleChange}
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
          <label htmlFor="finance_impact_2" className="form-label required">
            Impact sur les finances (Choix 2) [-10 à 10]
          </label>
          <select
            id="finance_impact_2"
            name="finance_impact_2"
            className="form-input"
            value={card.finance_impact_2 ?? ""}
            onChange={handleChange}
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

        <div className="form-actions">
          {error && <p className="login-form__error">{error}</p>}
          <button type="submit" className="btn btn-cta">
            <i className="fa-regular fa-floppy-disk"></i> Enregistrer
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-cancel"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCard;
