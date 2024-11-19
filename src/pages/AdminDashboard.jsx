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

  useEffect(() => {
    getAllDeck()
      .then((data) => {
        let parsedData;

        try {
          // Essayer de traiter le cas où les données sont directement au format JSON
          if (Array.isArray(data)) {
            parsedData = data;
          } else if (typeof data === "string") {
            // Essayer de parser le JSON si les données sont une chaîne
            parsedData = JSON.parse(data);
          } else {
            throw new Error("Unexpected data format");
          }
        } catch (error) {
          console.error("Failed to parse data:", error);
        }

        if (parsedData && Array.isArray(parsedData)) {
          setDecks(parsedData);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch decks:", error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteById(id)
      .then(() => {
        setDecks((prevDecks) =>
          prevDecks.filter((deck) => deck.id_deck !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete deck:", error);
      });
  };

  const toggleLive = (id, currentStatus) => {
    const toggleAction = currentStatus ? deactivateDeck : activateDeck;

    toggleAction(id)
      .then(() => {
        setDecks((prevDecks) =>
          prevDecks.map((deck) =>
            deck.id_deck === id
              ? { ...deck, live: currentStatus ? 0 : 1 }
              : deck
          )
        );
      })
      .catch((error) => {
        console.error("Failed to toggle live status:", error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user}!</p>
      <Link to="/admin/deck/new">Create a new deck</Link>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id_deck}>
            <strong>{deck.titre_deck}</strong> (Cards: {deck.nb_cartes}, Likes:{" "}
            {deck.nb_jaime})<span> | Live: {deck.live ? "Yes" : "No"}</span>
            <button onClick={() => toggleLive(deck.id_deck, deck.live)}>
              {deck.live ? "Deactivate" : "Activate"}
            </button>
            <Link to={`/admin/deck/${deck.id_deck}`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(deck.id_deck)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
