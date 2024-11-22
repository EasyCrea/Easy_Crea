import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <main className="homepage">
      <h1 className="homepage__title">Bienvenue sur EasyCrea</h1>
      <p className="homepage__subtitle">
        Créez, gérez et jouez avec vos decks personnalisés.
      </p>
      <div className="homepage__actions">
        <Link to="/loginCreateur" className="btn btn-filled">
          Login Créateur
        </Link>
        <Link to="/loginAdmin" className="btn btn-filled">
          Login Admin
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
