import React from "react";
import { BrowserRouter } from "react-router-dom"; // Utilisation explicite de BrowserRouter
import { AuthProvider } from "./context/AuthContext"; // Chemin adapté à votre structure
import Routes from "./routes/Routes";
import Header from "./components/header"; // Importe le composant Header
import Footer from "./components/footer"; // Importe le composant Footer

const App = () => (
  <BrowserRouter>
    {" "}
    {/* Utilisation de BrowserRouter pour le routage */}
    <AuthProvider>
      <Header /> {/* Header placé en haut */}
      <Routes /> {/* Contenu des routes */}
      <Footer /> {/* Footer placé en bas */}
    </AuthProvider>
  </BrowserRouter>
);

export default App;
