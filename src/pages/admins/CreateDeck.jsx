import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { createDeck } from "../../api/admins";

const CreateDeck = () => {
  const { user } = useAuth();
  const [deck, setDeck] = useState({
    titre_deck: "",
    date_debut_deck: "",
    date_fin_deck: "",
    nb_cartes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeck((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDeck(deck);
      alert("Deck créé avec succès.");
      setDeck({
        titre_deck: "",
        date_debut_deck: "",
        date_fin_deck: "",
        nb_cartes: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création du deck :", error);
      alert("Une erreur est survenue lors de la création du deck.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer un nouveau deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titre_deck">Titre</label>
          <input
            type="text"
            id="titre_deck"
            name="titre_deck"
            value={deck.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_debut_deck">Date de début de création</label>
          <input
            type="date"
            id="date_debut_deck"
            name="date_debut_deck"
            value={deck.date_debut_deck}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_fin_deck">Date de fin de création</label>
          <input
            type="date"
            id="date_fin_deck"
            name="date_fin_deck"
            value={deck.date_fin_deck}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nb_cartes">Nombre de cartes</label>
          <textarea
            id="nb_cartes"
            type="number"
            name="nb_cartes"
            value={deck.nb_cartes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
