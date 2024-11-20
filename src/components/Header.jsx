import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("Header re-rendered. Current user:", user);
  }, [user]);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          {user && user.role ? (
            <li className="nav__item">
              <Link to="/admin/dashboard" className="nav__link">
                Dashboard
              </Link>
            </li>
          ) : (
            user && (
              <li className="nav__item">
                <Link to="/createur/dashboard" className="nav__link">
                  My Decks
                </Link>
              </li>
            )
          )}
          {user ? (
            <li className="nav__item">
              <button onClick={logout} className="btn btn--logout">
                Logout
              </button>
            </li>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
