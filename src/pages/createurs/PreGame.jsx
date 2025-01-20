import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Coins, Users } from "lucide-react";
import { getAllCardInLiveDeck } from "../../api/createurs";
import { useAuth } from "../../context/AuthContext";

const PreGame = () => {
  const { id_deck } = useParams();
  const [titleDeck, setTitleDeck] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchDeckData = useCallback(async () => {
    try {
      setLoading(true);
      const cardsData = await getAllCardInLiveDeck(id_deck);
      setTitleDeck(cardsData.titleDeck);
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  }, [id_deck]);

  // Effet pour gérer la redirection et le chargement des données
  useEffect(() => {
    if (user !== null) {
      // On vérifie si la propriété banned existe et est égale à 1
      if ("banned" in user && user.banned === 1) {
        navigate("/banned");
        return;
      }
      // Si l'utilisateur n'est pas banni, on charge les données
      fetchDeckData();
    }
  }, [user, navigate, fetchDeckData]);

  // Si l'utilisateur n'est pas encore chargé, on affiche un écran de chargement ou rien
  if (user === null) {
    return null;
  }

  return (
    <>
      <div className="deck-creation-guide">
        <div className="guide-container">
          <div className="guide-section">
            <h2>Créez votre propre carte de jeu !</h2>
            <p>
              Vous allez contribuer à un deck thématique ({titleDeck}) en créant
              une carte unique. Vous ne pouvez créer qu&apos;une seule carte par
              deck. Ce deck, un fois complet, sera jouable sur
              l&apos;application mobile DeckOuverte.
            </p>
          </div>

          <div className="guide-instructions">
            <h3>Comment créer votre carte ?</h3>
            <ul>
              <li>
                <strong>Contexte :</strong> Chaque deck a un thème spécifique
                (ex: Maire d&apos;un village médiéval, Dirigeant d&apos;une
                startup, Explorateur polaire)
              </li>
              <li>
                <strong>Événement :</strong> Imaginez une situation qui pourrait
                survenir dans ce contexte
              </li>
              <li>
                <strong>Choix :</strong> Proposez deux actions opposées face à
                cet événement
              </li>
              <li>
                <strong>Conséquences :</strong> Évaluez l&apos;impact de chaque
                choix sur deux indicateurs :
                <ul>
                  <li>
                    <Users size={30} />
                    Population (moral, satisfaction, bien-être)
                  </li>
                  <li>
                    <Coins size={30} />
                    Finances (budget, revenus, dépenses)
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="scoring-guide">
            <h3>Conseils pour les scores</h3>
            <p>Chaque choix aura un impact entre -10 et +10 sur :</p>
            <div className="score-explanation">
              <div className="population-score">
                <h4>Population</h4>
                <p>Comment les gens perçoivent votre décision</p>
                <ul>
                  <li>+10 : Très positif, grande satisfaction</li>
                  <li>0 : Impact neutre</li>
                  <li>-10 : Très négatif, mécontentement général</li>
                </ul>
              </div>
              <div className="finance-score">
                <h4>Finances</h4>
                <p>Conséquences économiques de votre choix</p>
                <ul>
                  <li>+10 : Gain financier significatif</li>
                  <li>0 : Stabilité économique</li>
                  <li>-10 : Perte financière importante</li>
                </ul>
              </div>
            </div>
            <p className="balance-note">
              🔑 L&apos;équilibre est crucial : évitez les choix trop extrêmes !
            </p>
          </div>

          <div className="example-card">
            <h3>Exemple de Carte</h3>
            <div className="example-card-content">
              <p>
                <strong>Thème :</strong> Maire d&apos;un village médiéval
              </p>
              <p>
                <strong>Événement :</strong> Un marchand étranger propose de
                construire une route commerciale
              </p>
              <div className="choices">
                <div className="choice">
                  <strong>Choix 1 :</strong> Accepter la construction
                  <ul>
                    <li>Population : +3 (opportunités commerciales)</li>
                    <li>Finances : +5 (revenus du péage)</li>
                  </ul>
                </div>
                <div className="choice">
                  <strong>Choix 2 :</strong> Refuser la construction
                  <ul>
                    <li>Population : +2 (préservation traditions)</li>
                    <li>Finances : -3 (manque à gagner)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="action-section">
            <Link
              to={`/createurs/game/${id_deck}`}
              className="btn btn-filled btn-shadow"
            >
              Contribuer maintenant <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreGame;
