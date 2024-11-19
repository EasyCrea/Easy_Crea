import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Ajout d'un état d'erreur

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ajout du token dans les en-têtes Authorization
      API.get("/createurs/checkToken", {
        headers: {
          Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête Authorization
          "Content-Type": "application/json", // Corrigé le nom de l'en-tête
        },
        withCredentials: true, // Permet d'envoyer des informations d'identification si nécessaire
      })
        .then((response) => {
          if (response.data?.createur) {
            setUser(response.data.createur); // Assurez-vous de récupérer 'createur' depuis la réponse
          } else {
            setUser(null); // En cas de réponse inattendue
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          setUser(null); // Déconnexion en cas d'erreur
          setError("Token invalide ou expiré"); // Ajout d'un message d'erreur
          localStorage.removeItem("token"); // Supprimer le token invalide
        })
        .finally(() => {
          setLoading(false); // Mettre à jour 'loading' après l'exécution
        });
    } else {
      setUser(null); // Si pas de token, déconnecter l'utilisateur
      setLoading(false); // Mettre 'loading' à false si pas de token
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

// Hook pour accéder facilement au contexte
export const useAuth = () => React.useContext(AuthContext);
