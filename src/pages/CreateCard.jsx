import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCardToDeck } from "../api/admins";
import { useAuth } from "../context/AuthContext";

const CreateCard = () => {
  const { user } = useAuth(); // Assurez-vous que `useAuth` retourne un utilisateur avec un champ `role`
  const { id_deck } = useParams();
  const [error, setError] = useState("");
  const [texteCarte, setTexteCarte] = useState("");
  const [valeursChoix1, setValeursChoix1] = useState("");
  const [valeursChoix2, setValeursChoix2] = useState("");
  const [role] = useState(user?.role || "createur"); // Définit le rôle à partir de l'utilisateur ou par défaut à "createur"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCard = async (e) => {
    e.preventDefault();

    if (!texteCarte || !valeursChoix1 || !valeursChoix2) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      await addCardToDeck(id_deck, {
        texte_carte: texteCarte,
        valeurs_choix1: valeursChoix1,
        valeurs_choix2: valeursChoix2,
        role,
      });
      navigate(`/admin/deck/${id_deck}`);
    } catch (error) {
      console.error("Erreur lors de la création de la carte :", error);
      setError("Une erreur est survenue lors de la création de la carte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <form className="form-container" onSubmit={handleCreateCard}>
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Créer une carte</h2>
        </div>
        <div className="form-group">
          <label htmlFor="texteCarte" className="form-label required">
            Texte de la carte
          </label>
          <input
            type="text"
            id="texteCarte"
            className="form-input"
            placeholder="Entrez le texte de la carte"
            value={texteCarte}
            onChange={(e) => setTexteCarte(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeursChoix1" className="form-label required">
            Valeurs choix 1
          </label>
          <input
            type="text"
            id="valeursChoix1"
            className="form-input"
            placeholder="Entrez les valeurs pour le choix 1"
            value={valeursChoix1}
            onChange={(e) => setValeursChoix1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeursChoix2" className="form-label required">
            Valeurs choix 2
          </label>
          <input
            type="text"
            id="valeursChoix2"
            className="form-input"
            placeholder="Entrez les valeurs pour le choix 2"
            value={valeursChoix2}
            onChange={(e) => setValeursChoix2(e.target.value)}
            required
          />
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
