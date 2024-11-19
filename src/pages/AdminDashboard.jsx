import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getAllDeck,
  deleteById,
  activateDeck,
  deactivateDeck,
} from "../api/admins";

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
    try {
      await deleteById(id);
      setDecks((prev) => prev.filter((deck) => deck.id_deck !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
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
    }
  };

  if (!user || user.role !== "admin") {
    return <p>Accès interdit.</p>;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      <Link to="/admin/deck/new">Créer un nouveau deck</Link>
      {loading ? (
        <p>Chargement des decks...</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id_deck}>
              <strong>{deck.titre_deck}</strong> | Live:{" "}
              {deck.live ? "Oui" : "Non"}
              <button onClick={() => toggleLive(deck.id_deck, deck.live)}>
                {deck.live ? "Désactiver" : "Activer"}
              </button>
              <Link to={`/admin/deck/${deck.id_deck}`}>Modifier</Link>
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
