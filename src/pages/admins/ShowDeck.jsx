import { useState, useEffect } from "react";
import { Coins, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom"; // Ajout de useNavigate
import { useAuth } from "../../context/AuthContext";
import { getAllCardInDeck, deleteCardById } from "../../api/admins"; // Assurez-vous que deleteCard est bien défini

const ShowDeck = () => {
  const { user } = useAuth();
  const { id_deck } = useParams();
  const [deck, setDeck] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    if (user?.role === "admin") {
      fetchDeck(id_deck);
    }
  }, [user, id_deck]);

  const fetchDeck = async (id) => {
    setLoading(true);
    try {
      const data = await getAllCardInDeck(id);
      if (data.cards) {
        setCards(data.cards);
      }
      console.log({ data });
      setDeck(data.nom_deck);
      console.log({ deck });
    } catch (error) {
      console.error("Erreur lors du chargement du deck :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCard = (cardId) => {
    navigate(`/admin/edit-card/${cardId}`); // Redirige vers la page de modification de la carte
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette carte ?"
    );
    if (confirmDelete) {
      try {
        await deleteCardById(cardId); // Suppression de la carte via l'API
        alert("Carte supprimée avec succès.");
        setCards(cards.filter((card) => card.id_carte !== cardId)); // Met à jour l'état des cartes après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la carte :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  const handleCreateCard = (id_deck) => {
    navigate(`/create-card/${id_deck}`); // Redirige vers la page de création de carte
  };

  if (loading) {
    return <p className="loading">Chargement du deck...</p>;
  }

  if (!deck) {
    return (
      <>
        <p className="error-message">Deck non trouvé.</p>
        <button
          onClick={() => handleCreateCard(id_deck)}
          className="btn btn-create"
        >
          Créer une carte
        </button>
      </>
    );
  }

  return (
    <div className="show-deck">
      <div className="form-header">
        <button
          className="btn-back"
          onClick={() => navigate("/admin/dashboard")} // Retourne à la page du tableau de bord
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="form-title">{deck}</h2>
      </div>

      <ul className="card-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <li key={card.id_carte} className="card-list__item">
              <div className="card">
                <p className="card__text">
                  <strong>{card.texte_carte}</strong>
                </p>
                <p className="card__choice">
                  <span>
                    Choix 1: {card.valeurs_choix1}{" "}
                    <Users color="red" size={42} />
                  </span>
                </p>
                <p className="card__choice">
                  <span>
                    Choix 2: {card.valeurs_choix2} <Coins />
                  </span>
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => handleEditCard(card.id_carte)}
                    className="btn btn-edit"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id_carte)}
                    className="btn btn-delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="error-message">Aucune carte trouvée pour ce deck.</p>
        )}
      </ul>
    </div>
  );
};

export default ShowDeck;
