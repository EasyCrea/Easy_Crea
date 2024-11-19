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
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const data = await getAllDeck();
      let parsedData;

      if (Array.isArray(data)) {
        parsedData = data;
      } else if (typeof data === "string") {
        parsedData = JSON.parse(data);
      } else {
        throw new Error("Unexpected data format");
      }

      setDecks(parsedData);
    } catch (error) {
      console.error("Failed to fetch decks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteById(id);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id_deck !== id));
    } catch (error) {
      console.error("Failed to delete deck:", error);
    }
  };

  const toggleLive = async (id, currentStatus) => {
    const toggleAction = currentStatus ? deactivateDeck : activateDeck;

    try {
      await toggleAction(id);
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id_deck === id ? { ...deck, live: currentStatus ? 0 : 1 } : deck
        )
      );
    } catch (error) {
      console.error("Failed to toggle live status:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user ? user.email : "Guest"}!</p>
      <Link to="/admin/deck/new">Create a new deck</Link>
      {loading ? (
        <p>Loading decks...</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id_deck}>
              <strong>{deck.titre_deck}</strong> (Cards: {deck.nb_cartes},
              Likes: {deck.nb_jaime}){" "}
              <span> | Live: {deck.live ? "Yes" : "No"}</span>
              <button onClick={() => toggleLive(deck.id_deck, deck.live)}>
                {deck.live ? "Deactivate" : "Activate"}
              </button>
              <Link to={`/admin/deck/${deck.id_deck}`}>Edit</Link>
              <button onClick={() => handleDelete(deck.id_deck)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
