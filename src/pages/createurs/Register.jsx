import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCreateur } from "../../api/auth";

const Register = () => {
  const [nom_createur, setNom_createur] = useState(""); // Nom du créateur
  const [ad_email_createur, setAd_email_createur] = useState(""); // Email
  const [ddn, setDdn] = useState(""); // Date de naissance
  const [genre, setGenre] = useState(""); // Genre
  const [mdp_createur, setMdp_createur] = useState(""); // Mot de passe
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmation du mot de passe
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate();
  console.log({
    nom_createur,
    ad_email_createur,
    ddn,
    genre,
    mdp_createur,
    confirmPassword,
  });

  // Fonction pour valider la complexité du mot de passe
  const isPasswordComplex = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (
      !nom_createur ||
      !ad_email_createur ||
      !ddn ||
      !genre ||
      !mdp_createur ||
      !confirmPassword
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!isPasswordComplex(mdp_createur)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    if (mdp_createur !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Envoi des données au backend
      const response = await registerCreateur({
        nom_createur,
        ad_email_createur,
        ddn,
        genre,
        mdp_createur,
      });
      console.log({ response });
      navigate("/loginCreateur?success=1"); // Redirection après succès
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createur-container">
      <form className="form-container" onSubmit={handleRegister}>
        <div className="form-header">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/createurs/login")}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="form-title">Inscription</h2>
        </div>

        <div className="form-group">
          <label htmlFor="nom_createur" className="form-label required">
            Nom
          </label>
          <input
            type="text"
            id="nom_createur"
            className="form-input"
            placeholder="Ex: Dupont Alain"
            value={nom_createur}
            onChange={(e) => setNom_createur(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ad_email_createur" className="form-label required">
            Email
          </label>
          <input
            type="email"
            id="ad_email_createur"
            className="form-input"
            placeholder="Ex: dupont@gmail.com"
            value={ad_email_createur}
            onChange={(e) => setAd_email_createur(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ddn" className="form-label required">
            Date de naissance
          </label>
          <input
            type="date"
            id="ddn"
            className="form-input"
            value={ddn}
            onChange={(e) => setDdn(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre" className="form-label required">
            Genre
          </label>
          <select
            id="genre"
            className="form-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="" disabled>
              -- Sélectionnez votre genre --
            </option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mdp_createur" className="form-label required">
            Mot de passe
          </label>
          <input
            type="password"
            id="mdp_createur"
            className="form-input"
            placeholder="Mot de passe"
            value={mdp_createur}
            onChange={(e) => setMdp_createur(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label required">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-cta" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
