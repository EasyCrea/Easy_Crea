import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCreateur } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Vérification basique des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError(""); // Réinitialiser les erreurs
    setLoading(true); // Activer l'état de chargement

    try {
      const data = await loginCreateur(email, password);
      console.log("Réponse reçue :", data);

      // Stocker le token dans le localStorage
      localStorage.setItem("token", data.token);

      // Redirection vers la page d'accueil
      navigate("/");
    } catch (err) {
      // Gestion des erreurs
      setError(err.response?.data?.message || "Erreur de connexion.");
    } finally {
      setLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </form>
  );
};

export default Login;
