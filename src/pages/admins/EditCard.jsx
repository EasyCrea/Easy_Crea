import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById, editCardById } from "../../api/admins"; // Ajoutez vos fonctions API ici

const EditCard = () => {
  const { id_carte } = useParams(); // Récupère l'ID de la carte depuis l'URL
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (!card) {
    return <p className="error-message">Carte non trouvée.</p>;
  }

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <button
            type="button" // Définit explicitement comme bouton non soumis
            className="btn-back"
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut
              if (window.history.length > 1) {
                navigate(-1); // Retourner à la page précédente si possible
              } else {
                navigate("/cards"); // Page de secours (par exemple, la liste des cartes)
              }
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Modifier la carte</h2>
        </div>
        <div className="form-group">
          <label htmlFor="texte_carte" className="form-label required">
            Texte de la carte :
          </label>
          <textarea
            id="texte_carte"
            name="texte_carte"
            value={card.texte_carte || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeurs_choix1" className="form-label required">
            Valeurs du choix 1 :
          </label>
          <input
            type="text"
            id="valeurs_choix1"
            name="valeurs_choix1"
            value={card.valeurs_choix1 || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeurs_choix2" className="form-label required">
            Valeurs du choix 2 :
          </label>
          <input
            type="text"
            id="valeurs_choix2"
            name="valeurs_choix2"
            value={card.valeurs_choix2 || ""}
            onChange={handleChange}
            required
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
