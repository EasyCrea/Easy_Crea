import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__content">
        <div className="footer__branding">
          <span className="footer__title">EasyCrea</span>
        </div>
        <div className="footer__links">
          <Link to="/terms">Conditions d&apos;utilisation</Link>
          <Link to="/privacy">Politique de confidentialité</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
