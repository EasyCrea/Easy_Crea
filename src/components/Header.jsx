import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLiveDeck as fetchLiveDeckData } from "../api/admins";
import { Palette, Shield, Menu, X } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [id_deck, setId_deck] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !user.banned) {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderAuthLinks = () => {
    if (!user) {
      return (
        <>
          <li className="nav__item">
            <Link
              to="/loginAdmin"
              className="nav__link btn btn-outline"
              onClick={toggleMenu}
            >
              <Shield size={20} />
              Administration
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="/loginCreateur"
              className="btn btn-filled nav__link"
              onClick={toggleMenu}
            >
              <Palette size={20} />
              <p>Espace créateur</p>
            </Link>
          </li>
        </>
      );
    }

    // If user is banned, show only the default links
    if (user.banned) {
      return (
        <>
          <li className="nav__item">
            <Link
              to="/loginAdmin"
              className="nav__link btn btn-outline"
              onClick={toggleMenu}
            >
              <Shield size={20} />
              Administration
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="/loginCreateur"
              className="btn btn-filled nav__link"
              onClick={toggleMenu}
            >
              <Palette size={20} />
              <p>Espace créateur</p>
            </Link>
          </li>
        </>
      );
    }

    // Show appropriate content for non-banned users
    return (
      <>
        {user.role === "admin" ? (
          <li className="nav__item">
            <Link
              to="/admin/dashboard"
              className="nav__link btn btn-filled"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          </li>
        ) : (
          id_deck && (
            <li className="nav__item">
              <Link
                to={`/createurs/game/${id_deck}`}
                className="nav__link btn btn-filled"
                onClick={toggleMenu}
              >
                Deck
              </Link>
            </li>
          )
        )}
        <li className="nav__item">
          <button
            onClick={() => {
              logout();
              toggleMenu();
            }}
            className="nav__link btn btn-outline"
          >
            Logout
          </button>
        </li>
      </>
    );
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__mobile-toggle" onClick={toggleMenu}>
          <Link
            to="/"
            className={`nav__linkLogo ${
              isMenuOpen ? "nav__linkLogo--hidden" : ""
            }`}
          >
            <div className="nav__logoContainer">
              <img
                src="/images/logo_easy_crea.png"
                alt="EasyCrea Logo"
                className="nav__logo"
              />
              <span className="nav__logoText">EasyCrea</span>
            </div>
          </Link>
          {isMenuOpen ? <X size={50} /> : <Menu size={50} />}
        </div>
        <ul className={`nav__list ${isMenuOpen ? "nav__list--open" : ""}`}>
          <li className="nav__item">
            <Link
              to="/"
              className={`nav__linkLogo ${
                isMenuOpen ? "nav__linkLogo--hidden" : ""
              }`}
            >
              <div className="nav__logoContainer">
                <img
                  src="/images/logo_easy_crea.png"
                  alt="EasyCrea Logo"
                  className="nav__logo"
                />
                <span className="nav__logoText">EasyCrea</span>
              </div>
            </Link>
          </li>
          {renderAuthLinks()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
