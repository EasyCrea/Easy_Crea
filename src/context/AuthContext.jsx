import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("dsdqs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/me") // Endpoint pour récupérer les infos utilisateur
        .then((response) => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setUser("toto");
          console.log("Erreur de connexion");
        });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour accéder facilement au contexte
export const useAuth = () => React.useContext(AuthContext);
