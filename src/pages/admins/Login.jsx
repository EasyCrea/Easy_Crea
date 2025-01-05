import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginAdmin } from "../../api/auth";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    loginAdmin(email, password)
      .then((data) => {
        if (data.response?.status === "error") {
          setError("Email ou mot de passe incorrect");
          return;
        }

        // Stocker le token et définir l'utilisateur
        localStorage.setItem("token", data.token);
        setUser({
          id: data.admin.id,
          email: data.admin.email,
          role: data.admin.role,
        });

        // Rediriger après succès
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.error("Erreur de connexion :", err);
        setError("Impossible de se connecter. Vérifiez vos informations.");
      })
      .finally(() => {
        setLoading(false);
      });
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
          <div className="input-toggle">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <EyeOff className="password-toggle-eye" />
              ) : (
                <Eye className="password-toggle-eye" />
              )}
            </button>
          </div>
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
