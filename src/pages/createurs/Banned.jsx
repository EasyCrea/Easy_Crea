import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const Banned = () => {
  return (
    <div className="banned-container">
      <div className="banned-content">
        <div className="banned-card">
          <div className="banned-icon">
            <Lock size={64} />
          </div>
          <h1>Vous avez été banni</h1>
          <p>Vous avez été banni de la plateforme.</p>
          <button
            className="btn btn-filled"
            onClick={() => window.location.reload()}
          >
            Actualiser la page
          </button>
          <button
            className="btn btn-filled"
            onClick={() => window.location.reload()}
          >
            <Link to="/">Retour à l&apos;accueil</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banned;
