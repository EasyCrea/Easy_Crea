import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllDeck,
  deleteById,
  activateDeck,
  deactivateDeck,
} from "../../api/admins";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchDecks();
    }
  }, [user]);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const data = await getAllDeck();
      setDecks(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des decks :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer ce deck ?`)) {
      return;
    }
    try {
      await deleteById(id);
      setDecks((prev) => prev.filter((deck) => deck.id_deck !== id));
      alert(`Deck supprimé avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const toggleLive = async (id, currentStatus) => {
    try {
      const action = currentStatus ? deactivateDeck : activateDeck;
      await action(id);
      setDecks((prev) =>
        prev.map((deck) =>
          deck.id_deck === id ? { ...deck, live: currentStatus ? 0 : 1 } : deck
        )
      );
    } catch (error) {
      console.error("Erreur lors du changement de statut :", error);
      alert("Une erreur est survenue lors du changement de statut.");
    }
  };

  if (!user || user.role !== "admin") {
    return <p>Accès interdit.</p>;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      <Link to="/admin/createDeck">Créer un nouveau deck</Link>
      {loading ? (
        <p>Chargement des decks...</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id_deck}>
              <strong>{deck.titre_deck}</strong> | Live:{" "}
              {deck.live ? "Oui" : "Non"}
              <Link to={`/admin/deck/${deck.id_deck}`}>Voir deck</Link>
              <button onClick={() => toggleLive(deck.id_deck, deck.live)}>
                {deck.live ? "Désactiver" : "Activer"}
              </button>
              <Link to={`/admin/deck/${deck.id_deck}/edit`}>Modifier</Link>
              <button onClick={() => handleDelete(deck.id_deck)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
