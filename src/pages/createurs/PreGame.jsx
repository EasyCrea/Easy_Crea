import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllCardInLiveDeck } from "../../api/createurs"; // Assurez-vous que cette fonction est correctement importée

const PreGame = () => {
  const { id_deck } = useParams(); // Récupère l'ID du deck depuis l'URL
  const [titleDeck, setTitleDeck] = useState(""); // Stocke le titre du deck
  const [error, setError] = useState(null); // État pour les erreurs
  const [loading, setLoading] = useState(true); // État de chargement

  // Fonction pour récupérer les données du deck
  const fetchDeckData = useCallback(async () => {
    try {
      setLoading(true); // Débute le chargement
      const cardsData = await getAllCardInLiveDeck(id_deck); // Appelle l'API
      setTitleDeck(cardsData.titleDeck); // Stocke le titre du deck
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Une erreur est survenue lors du chargement des données."); // Gère l'erreur
    } finally {
      setLoading(false); // Termine le chargement
    }
  }, [id_deck]);

  // Appelle `fetchDeckData` une fois que le composant est monté
  useEffect(() => {
    fetchDeckData();
  }, [fetchDeckData]);

  return (
    <div>
      <h1>PreGame</h1>
      {loading ? (
        <p>Chargement des données...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <p>Deck ID : {id_deck}</p>
          <p>Title : {titleDeck}</p>
        </>
      )}

      <Link
        to={`/createurs/game/${id_deck}`}
        className="btn btn-filled btn-shadow"
      >
        Commencer maintenant <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default PreGame;
