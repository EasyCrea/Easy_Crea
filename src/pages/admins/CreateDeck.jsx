import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createDeck } from "../../api/admins";
import { useNavigate } from "react-router-dom";

const CreateDeck = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [deck, setDeck] = useState({
    titre_deck: "",
    date_debut_deck: "",
    date_fin_deck: "",
    nb_cartes: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeck((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createDeck(deck); // Récupère les données retournées
      const idDeck = response.id_deck; // Récupère l'ID du deck depuis la réponse
      alert("Deck créé avec succès.");
      setDeck({
        titre_deck: "",
        date_debut_deck: "",
        date_fin_deck: "",
        nb_cartes: "",
      });
      navigate(`/createFirstCard/${idDeck}`); // Utilise l'ID du deck pour naviguer
    } catch (error) {
      setError(
        error.response?.data?.message || "Erreur lors de la création du deck."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-header">
          <button
            className="btn-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Créer un deck</h2>
        </div>

        <div className="form-group">
          <label htmlFor="titre_deck" className="form-label required">
            Titre
          </label>
          <input
            type="text"
            id="titre_deck"
            name="titre_deck"
            className="form-input"
            value={deck.titre_deck}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_debut_deck" className="form-label required">
            Date de début de création
          </label>
          <input
            type="date"
            id="date_debut_deck"
            name="date_debut_deck"
            className="form-input"
            value={deck.date_debut_deck}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_fin_deck" className="form-label required">
            Date de fin de création
          </label>
          <input
            type="date"
            id="date_fin_deck"
            name="date_fin_deck"
            className="form-input"
            value={deck.date_fin_deck}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nb_cartes" className="form-label required">
            Nombre de cartes
          </label>
          <input
            id="nb_cartes"
            type="number"
            name="nb_cartes"
            className="form-input"
            value={deck.nb_cartes}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="login-form__error">{error}</p>}
        <button type="submit" className="btn-cta" disabled={loading}>
          {loading ? "Chargement..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
