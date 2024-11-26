import { useState } from "react";
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
    <div className="login-container">
      <form className="form-container" onSubmit={handleLogin}>
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Connexion Admin</h2>
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
        <button type="submit" className="btn btn-cta" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
