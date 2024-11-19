import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Chemin adapté à votre structure
import Routes from "./routes/Routes";
import Header from "./components/header"; // Importe le composant Header
import Footer from "./components/footer"; // Importe le composant Footer

const App = () => (
  <AuthProvider>
    <Router>
      <Header /> {/* Header placé en haut */}
      <Routes /> {/* Contenu des routes */}
      <Footer /> {/* Footer placé en bas */}
    </Router>
  </AuthProvider>
);

export default App;
