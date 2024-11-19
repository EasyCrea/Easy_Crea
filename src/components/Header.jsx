import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("Header re-rendered. Current user:", user);
  }, [user]); // Réagit aux changements de `user`

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && user.role ? (
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          ) : (
            user && (
              <li>
                <Link to="/createur/dashboard">My Decks</Link>
              </li>
            )
          )}
          {user ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/loginCreateur">Login créateur</Link>
              </li>
              <li>
                <Link to="/loginAdmin">Login admin</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
