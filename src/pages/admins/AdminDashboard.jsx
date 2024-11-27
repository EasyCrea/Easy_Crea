import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/loginAdmin"); // Rediriger si l'utilisateur n'est pas admin
    } else {
      fetchDecks();
    }
  }, [user, navigate]);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const data = await getAllDeck();
      setDecks(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des decks :", error);
      alert("Une erreur est survenue lors du chargement des decks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce deck ?")) return;
    try {
      await deleteById(id);
      setDecks((prev) => prev.filter((deck) => deck.id_deck !== id));
      alert("Deck supprimé avec succès.");
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

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Tableau de bord - Administrateur</h1>
        <Link to="/admin/createDeck" className="btn btn-outline">
          Créer un nouveau deck
        </Link>
      </header>

      <main className="admin-content">
        {loading ? (
          <p className="loading-message">Chargement des decks...</p>
        ) : (
          <>
            {/* Tableau visible pour les écrans larges */}
            <table className="deck-table">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                  <th scope="col">Live</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {decks.map((deck) => (
                  <tr key={deck.id_deck}>
                    <td>
                      <strong>{deck.titre_deck}</strong>
                      <span className="deck-card-count">
                        ({deck.nb_cartes}{" "}
                        {deck.nb_cartes > 1 ? "cartes" : "carte"})
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-indicator ${
                          deck.live ? "active" : "inactive"
                        }`}
                      ></span>
                    </td>
                    <td>
                      {deck.date_debut_deck && (
                        <span>{deck.date_debut_deck}</span>
                      )}{" "}
                      -{" "}
                      {deck.date_fin_deck && <span>{deck.date_fin_deck}</span>}
                    </td>
                    <td>
                      <button className="btn btn-view">
                        <Link to={`/admin/deck/${deck.id_deck}`}>Voir</Link>
                      </button>
                      <button
                        onClick={() => toggleLive(deck.id_deck, deck.live)}
                        className={`btn ${
                          deck.live ? "btn-deactivate" : "btn-activate"
                        }`}
                      >
                        {deck.live ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        onClick={() => handleDelete(deck.id_deck)}
                        className="btn btn-delete"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cards pour les écrans étroits */}
            <div className="deck-cards">
              {decks.map((deck) => (
                <div key={deck.id_deck} className="deck-card">
                  <div className="deck-title">
                    {deck.titre_deck}{" "}
                    <span className="deck-card-count">
                      ({deck.nb_cartes}{" "}
                      {deck.nb_cartes > 1 ? "cartes" : "carte"})
                    </span>
                  </div>
                  <div className="deck-details">
                    <div>
                      Live:{" "}
                      <span
                        className={`status-indicator ${
                          deck.live ? "active" : "inactive"
                        }`}
                      ></span>
                    </div>
                    <div>
                      Dates: {deck.date_debut_deck || "N/A"} -{" "}
                      {deck.date_fin_deck || "N/A"}
                    </div>
                  </div>
                  <div className="deck-actions">
                    <Link
                      to={`/admin/deck/${deck.id_deck}`}
                      className="btn btn-view"
                    >
                      Voir
                    </Link>
                    <button
                      onClick={() => toggleLive(deck.id_deck, deck.live)}
                      className={`btn ${
                        deck.live ? "btn-deactivate" : "btn-activate"
                      }`}
                    >
                      {deck.live ? "Désactiver" : "Activer"}
                    </button>
                    <button
                      onClick={() => handleDelete(deck.id_deck)}
                      className="btn btn-delete"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
