import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginCreateur } from "../../api/auth";
import { getLiveDeck } from "../../api/admins";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si "success" est dans l'URL
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "1") {
      setSuccessMessage("Création terminée avec succès !");
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await loginCreateur(email, password);
      localStorage.setItem("token", data.token);

      const deckLiveResponse = await getLiveDeck();
      if (deckLiveResponse?.deck?.id_deck) {
        const { id_deck } = deckLiveResponse.deck;
        navigate(`/createurs/game/${id_deck}`);
      } else {
        throw new Error("Aucun deck live trouvé.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="form-container" onSubmit={handleLogin}>
        <div className="form-header">
          <button
            className="btn-back"
            onClick={() => navigate("/createurs/register")}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Connexion</h2>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label required">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label required">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login-form__error">{error}</p>}
        <button type="submit" className="btn-cta" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
        <a href="/createurs/register">
          {" "}
          Pas encore de compte ? <span>Créez en un !</span>
        </a>
      </form>
    </div>
  );
};

export default Login;
