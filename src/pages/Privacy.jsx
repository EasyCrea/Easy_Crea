import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Politique de confidentialité</h1>
      <p className="privacy-policy-update">
        <strong>Dernière mise à jour :</strong> [20/01/2025]
      </p>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Introduction</h2>
        <p className="privacy-policy-text">
          Nous sommes soucieux de protéger vos données personnelles et votre vie
          privée. Cette politique de confidentialité explique comment nous
          collectons, utilisons, et protégeons vos informations personnelles
          dans le cadre de notre application.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Données collectées</h2>
        <ul className="privacy-policy-list">
          <li>Nom</li>
          <li>Adresse email</li>
          <li>Mot de passe (crypté)</li>
          <li>Date de naissance</li>
          <li>Genre</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Usage des données</h2>
        <p className="privacy-policy-text">Ces données sont utilisées pour :</p>
        <ul className="privacy-policy-list">
          <li>Vous identifier et vous connecter à votre compte.</li>
          <li>Personnaliser votre expérience utilisateur.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Conservation des données</h2>
        <p className="privacy-policy-text">
          Vos données sont conservées tant que votre compte est actif. En cas de
          suppression de votre compte, nous supprimons vos données sous 30
          jours.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Sécurité des données</h2>
        <p className="privacy-policy-text">
          Nous utilisons des technologies avancées pour protéger vos données,
          notamment le chiffrement des mots de passe et des connexions
          sécurisées via HTTPS.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Partage des données</h2>
        <p className="privacy-policy-text">
          Nous ne partageons vos données avec aucune tierce partie.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Vos droits</h2>
        <p className="privacy-policy-text">
          Vous disposez des droits suivants :
        </p>
        <ul className="privacy-policy-list">
          <li>Accès à vos données personnelles.</li>
          <li>Modification de vos informations.</li>
          <li>Suppression de vos données sur demande.</li>
        </ul>
        <p className="privacy-policy-text">
          Pour exercer vos droits, veuillez nous contacter à :{" "}
          <a className="privacy-policy-link">
            <Link to="/contact">Contact</Link>
          </a>
          .
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-subtitle">Contact</h2>
        <p className="privacy-policy-text">
          Pour toute question, écrivez-nous à :{" "}
          <a className="privacy-policy-link">
            <Link to="/contact">Contact</Link>
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
