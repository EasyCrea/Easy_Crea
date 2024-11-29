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
      setCard(response.card || {}); // Use response.card based on the actual API response
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
      [name]: value,
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
        <div className="form-header">
          <button
            type="button"
            className="btn-back"
            onClick={(e) => {
              e.preventDefault();
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/cards");
              }
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Modifier la carte</h2>
        </div>

        <div className="form-group">
          <label htmlFor="event_description" className="form-label required">
            Description de l'événement :
          </label>
          <textarea
            id="event_description"
            name="event_description"
            value={card.event_description || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

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
            Impact sur la population (Choix 1)
          </label>
          <input
            type="number"
            id="population_impact_1"
            name="population_impact_1"
            className="form-input"
            value={card.population_impact_1 || 0}
            min={-10}
            max={10}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="finance_impact_1" className="form-label required">
            Impact sur les finances (Choix 1)
          </label>
          <input
            type="number"
            id="finance_impact_1"
            name="finance_impact_1"
            value={card.finance_impact_1 || 0}
            onChange={handleChange}
            required
            min={-10}
            max={10}
            className="form-input"
          />
        </div>

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
            Impact sur la population (Choix 2)
          </label>
          <input
            type="number"
            id="population_impact_2"
            name="population_impact_2"
            className="form-input"
            value={card.population_impact_2 || 0}
            min={-10}
            max={10}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="finance_impact_2" className="form-label required">
            Impact sur les finances (Choix 2)
          </label>
          <input
            type="number"
            id="finance_impact_2"
            name="finance_impact_2"
            value={card.finance_impact_2 || 0}
            onChange={handleChange}
            required
            min={-10}
            max={10}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          {error && <p className="login-form__error">{error}</p>}
          <button type="submit" className="btn btn-cta">
            <i className="fa-regular fa-floppy-disk"></i>
            Enregistrer
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
