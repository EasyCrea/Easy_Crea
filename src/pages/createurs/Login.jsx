import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCreateur } from "../../api/auth";
import { getLiveDeck } from "../../api/admins";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <form className="login-form" onSubmit={handleLogin}>
      <h2 className="login-form__title">Connexion</h2>
      <div className="login-form__group">
        <label htmlFor="email" className="login-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-form__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login-form__group">
        <label htmlFor="password" className="login-form__label">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          className="login-form__input"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="login-form__error">{error}</p>}
      <button type="submit" className="login-form__button" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </form>
  );
};

export default Login;
