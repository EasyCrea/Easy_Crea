import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./../pages/HomePage";
import LoginPageCreateur from "./../pages/createurs/Login";
import Register from "./../pages/createurs/Register";
import LoginPageAdmin from "./../pages/admins/Login";
import AdminDashboard from "../pages/admins/AdminDashboard";
import CreateDeck from "../pages/admins/CreateDeck";
import ShowDeck from "../pages/admins/ShowDeck";
import CreateCard from "../pages/CreateCard";
import CreateFirstCard from "../pages/admins/CreateFirstCard";
import EditCard from "../pages/admins/EditCard";
import Game from "./../pages/createurs/Game";
import { useAuth } from "./../context/AuthContext"; // Hook pour accéder au contexte Auth

// Composant pour protéger les routes selon les rôles
// eslint-disable-next-line react/prop-types
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
      {/* Route publique : page d'accueil */}
      <Route path="/" element={<HomePage />} />

      {/* Route publique : page de connexion */}
      <Route path="/loginCreateur" element={<LoginPageCreateur />} />

      {/* Route publique : page de création de compte */}
      <Route path="/createurs/register" element={<Register />} />

      {/* Route publique : page de connexion */}
      <Route path="/loginAdmin" element={<LoginPageAdmin />} />

      {/* Route protégée : page de création de carte */}
      <Route
        path="/create-card/:id_deck"
        element={
          <ProtectedRoute role="createur">
            <CreateCard />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : page de visualisation du deck en cours de creation et de creation de carte */}
      <Route
        path="/createurs/game/:id_deck"
        element={
          <ProtectedRoute role="createur">
            <Game />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : tableau de bord administrateur */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : creation de deck*/}
      <Route
        path="/admin/createDeck"
        element={
          <ProtectedRoute role="admin">
            <CreateDeck />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : creation de deck*/}
      <Route
        path="/admin/createDeck"
        element={
          <ProtectedRoute role="admin">
            <CreateDeck />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : créer la première carte d'un deck après la création d'un deck */}
      <Route
        path="/createFirstCard/:id_deck"
        element={
          <ProtectedRoute role="admin">
            <CreateFirstCard />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : affichage d'un deck */}
      <Route
        path="/admin/deck/:id_deck"
        element={
          <ProtectedRoute role="admin">
            <ShowDeck />
          </ProtectedRoute>
        }
      />

      {/* Route protégée : modifier une carte */}
      <Route
        path="/admin/edit-card/:id_carte"
        element={
          <ProtectedRoute role="admin">
            <EditCard />
          </ProtectedRoute>
        }
      />

      {/* Route par défaut : redirection vers la page de connexion */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
