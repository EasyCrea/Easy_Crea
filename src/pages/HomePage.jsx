import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <main className="homepage">
      <h1 className="homepage__title">
        Créez des expériences de jeu <span>uniques</span>
      </h1>

      <p className="homepage__subtitle">
        Concevez, testez et pârtagez vos deck de jeu en toute simplicité
      </p>
      <div className="homepage__actions">
        <Link to="/loginCreateur" className="btn btn-filled btn-shadow">
          Commencer maintenant <i class="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
