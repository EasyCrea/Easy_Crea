import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById, editCardById } from "../../api/admins"; // Ajoutez vos fonctions API ici

const EditCard = () => {
  const { id_carte } = useParams(); // Récupère l'ID de la carte depuis l'URL
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log({ id_carte });

  useEffect(() => {
    fetchCard(id_carte);
  }, [id_carte]);

  const fetchCard = async (id) => {
    setLoading(true);
    try {
      const data = await getCardById(id); // Appelle l'API pour récupérer les détails de la carte
      setCard(data.card || {});
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
      await editCardById(id_carte, card); // Met à jour la carte via l'API
      alert("Carte mise à jour avec succès.");
      navigate(-1); // Retour à la page précédente
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

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!card) {
    return <p className="error-message">Carte non trouvée.</p>;
  }

  return (
    <div className="edit-card">
      <h1 className="edit-card__title">Modifier la carte</h1>
      <form onSubmit={handleSubmit} className="edit-card__form">
        <div className="form-group">
          <label htmlFor="texte_carte">Texte de la carte :</label>
          <textarea
            id="texte_carte"
            name="texte_carte"
            value={card.texte_carte || ""}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeurs_choix1">Valeurs du choix 1 :</label>
          <input
            type="text"
            id="valeurs_choix1"
            name="valeurs_choix1"
            value={card.valeurs_choix1 || ""}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeurs_choix2">Valeurs du choix 2 :</label>
          <input
            type="text"
            id="valeurs_choix2"
            name="valeurs_choix2"
            value={card.valeurs_choix2 || ""}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-save">
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
