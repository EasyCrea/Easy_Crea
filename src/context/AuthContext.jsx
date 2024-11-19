import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/createurs/checkToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log({ response }, "################");

          const data = response.data;

          if (data.status === "success" && data.decoded?.role) {
            setUser({
              id: data.decoded.id,
              email: data.decoded.email,
              role: data.decoded.role,
            });
          } else {
            throw new Error(data.message || "Rôle inconnu");
          }
        })
        .catch((err) => {
          console.error("Erreur lors de l'authentification :", err);
          setError("Authentification échouée. Veuillez réessayer.");
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
