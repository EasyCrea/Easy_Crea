import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./../pages/HomePage";
import LoginPageCreateur from "./../pages/createurs/Login";
import LoginPageAdmin from "./../pages/admins/Login";
import AdminDashboard from "./../pages/AdminDashboard";
import { useAuth } from "./../context/AuthContext"; // Hook pour accéder au contexte Auth

// Composant pour protéger les routes selon les rôles
const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useAuth();

  // Affiche un indicateur de chargement tant que l'état de l'authentification n'est pas connu
  if (loading) {
    return <div>Chargement...</div>; // Vous pouvez remplacer par un spinner ou autre composant de chargement
  }

  // Si l'utilisateur n'est pas connecté, redirige vers login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Vérifie si l'utilisateur a le rôle requis
  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirection si le rôle ne correspond pas
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route publique : page de connexion */}
      <Route path="/loginCreateur" element={<LoginPageCreateur />} />

      {/* Route publique : page de connexion */}
      <Route path="/loginAdmin" element={<LoginPageAdmin />} />

      {/* Route publique : page d'accueil */}
      <Route path="/" element={<HomePage />} />

      {/* Route protégée : tableau de bord administrateur */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Route par défaut : redirection vers la page de connexion */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
