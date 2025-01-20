import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginCreateur } from "../../api/auth";
import { getLiveDeck } from "../../api/admins";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { updateUserFromLoginResponse } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "1") {
      setSuccessMessage("Création terminée avec succès !");
    }
  }, [location]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    loginCreateur(email, password)
      .then((data) => {
        // Vérifie d'abord si l'utilisateur est banni
        if (data?.user?.banned === 1) {
          setLoading(false);
          updateUserFromLoginResponse(data); // Met à jour le contexte
          navigate("/banned");
          return Promise.reject(); // Arrête la chaîne de promesses
        }

        // Si non banni, continue normalement
        localStorage.setItem("token", data.token);
        updateUserFromLoginResponse(data);
        return getLiveDeck();
      })
      .then((deckLiveResponse) => {
        if (!deckLiveResponse) return; // Si la promesse a été rejetée plus tôt

        if (!deckLiveResponse.deck?.id_deck) {
          setError("Aucun deck actif trouvé.");
          setLoading(false);
          return;
        }

        const { id_deck } = deckLiveResponse.deck;
        setLoading(false);
        navigate(`/createurs/pregame/${id_deck}`);
      })
      .catch((err) => {
        if (!err) return; // Si c'est notre rejet intentionnel pour banned

        console.error(err);
        setError(
          err.response?.data?.message ||
            "Une erreur est survenue. Vérifiez vos informations ou réessayez plus tard."
        );
        setLoading(false);
      });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {successMessage && (
        <p className="success-message" role="alert" aria-live="polite">
          {successMessage}
        </p>
      )}
      <form
        className="form-container"
        onSubmit={handleLogin}
        aria-labelledby="login-title"
      >
        <div className="form-header">
          <button
            type="button"
            className="btn-back"
            onClick={handleBack}
            aria-label="Retour"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 id="login-title" className="form-title">
            Connexion
          </h2>
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
            aria-required="true"
            autoComplete="email"
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
        {error && (
          <p className="login-form__error" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="btn-cta"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
        <a href="/createurs/register">
          Pas encore de compte ? <span>Créez-en un !</span>
        </a>
      </form>
    </div>
  );
};

export default Login;
