import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLiveDeck as fetchLiveDeckData } from "../api/admins";

const Header = () => {
  const { user, logout } = useAuth();
  const [id_deck, setId_deck] = useState(null);

  useEffect(() => {
    console.log("Header re-rendered. Current user:", user);
    if (user) {
      fetchLiveDeck();
    }
  }, [user]);

  const fetchLiveDeck = async () => {
    try {
      const deckLiveResponse = await fetchLiveDeckData();
      if (deckLiveResponse?.deck?.id_deck) {
        setId_deck(deckLiveResponse.deck.id_deck);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du deck en live :", error);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          {user ? (
            user.role === "admin" ? (
              <li className="nav__item">
                <Link to="/admin/dashboard" className="nav__link">
                  Dashboard
                </Link>
              </li>
            ) : (
              id_deck && (
                <li className="nav__item">
                  <Link to={`/createurs/game/${id_deck}`} className="nav__link">
                    Deck
                  </Link>
                </li>
              )
            )
          ) : (
            <>
              <li className="nav__item">
                <Link to="/loginCreateur" className="nav__link">
                  Login créateur
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/loginAdmin" className="nav__link">
                  Login admin
                </Link>
              </li>
            </>
          )}
          {user && (
            <li className="nav__item">
              <button onClick={logout} className="btn btn--logout">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
