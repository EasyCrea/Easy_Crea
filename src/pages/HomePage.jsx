import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLiveDeck } from "../api/admins";

const HomePage = () => {
  const { user } = useAuth(); // Récupère l'utilisateur depuis le contexte
  const [path, setPath] = useState("/createurs/login"); // Chemin par défaut

  useEffect(() => {
    const determinePath = async () => {
      if (!user) {
        // Aucun utilisateur connecté
        setPath("/loginCreateur"); // Redirige vers la page de connexion pour les créateurs
        return;
      }

      if (user.role === "createur") {
        // Utilisateur avec le rôle "createur"
        try {
          const deckLiveResponse = await getLiveDeck(); // Appelle l'API pour obtenir le deck
          if (deckLiveResponse?.deck?.id_deck) {
            const { id_deck } = deckLiveResponse.deck;
            setPath(`/createurs/pregame/${id_deck}`); // Définit le lien vers le jeu
          } else {
            setPath("/loginCreateur");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du deck :", error);
          setPath("/loginCreateur");
        }
      } else if (user.role === "admin") {
        // Utilisateur avec le rôle "admin"
        setPath("/admin/dashboard");
      }
    };

    determinePath(); // Détermine dynamiquement le chemin
  }, [user]);

  return (
    <main className="homepage">
      <h1 className="homepage__title">
        Créez des expériences de jeu <span>uniques</span>
      </h1>

      <p className="homepage__subtitle">
        Concevez, testez et partagez vos decks de jeu en toute simplicité
      </p>

      <div className="homepage__actions">
        <Link to={path} className="btn btn-filled btn-shadow">
          Commencer maintenant <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
