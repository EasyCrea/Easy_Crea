import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginAdmin } from "../../api/auth";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem("token", data.token);
      setUser({
        id: data.admin.id,
        email: data.admin.email,
        role: data.admin.role,
      });
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError(
        err.message || "Erreur lors de la connexion. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1 className="login-form__title">Connexion Admin</h1>
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
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
};

export default Login;
