import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./../pages/HomePage";
import LoginPage from "./../pages/createurs/Login";
import AdminDashboard from "./../pages/AdminDashboard";
import { useAuth } from "./../context/AuthContext"; // Hook pour accéder au contexte Auth

// Composant pour protéger les routes selon les rôles
const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirige vers login
  if (!user) return <Navigate to="/login" />;

  // Vérifie si l'utilisateur a le rôle requis
  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirection si le rôle ne correspond pas
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route publique pour login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route publique : page d'accueil */}
      <Route path="/" element={<HomePage />} />

      {/* Routes protégées pour les admins */}
      <Route
        path="/admin/dashboard"
        element={
          // <ProtectedRoute role="admin">
          <AdminDashboard />
          // </ProtectedRoute>
        }
      />

      {/* Route par défaut (404 ou redirection vers login si non trouvé) */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
