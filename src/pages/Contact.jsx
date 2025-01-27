import { useState } from "react";
import { sendEmail } from "../api/createurs";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Le nom est requis.";
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide.";
    }
    if (!formData.subject) newErrors.subject = "L'objet est requis.";
    if (!formData.message) newErrors.message = "Le message est requis.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);
      try {
        await sendEmail(formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {submitted && (
        <p className="success-message" role="alert" aria-live="polite">
          Merci pour votre message !
        </p>
      )}
      <form
        className="form-container"
        onSubmit={handleSubmit}
        aria-labelledby="contact-form-title"
      >
        <h2 id="contact-form-title" className="form-title">
          Contactez-nous
        </h2>
        {/** Champs Nom, Email, Objet, Message */}
        {/* Nom */}
        <div className="form-group">
          <label htmlFor="name" className="form-label required">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "border-red-500" : ""}`}
            placeholder="Nom"
          />
          {errors.name && (
            <p className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label required">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? "border-red-500" : ""}`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Objet */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label required">
            Objet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`form-input ${errors.subject ? "border-red-500" : ""}`}
            placeholder="Objet"
          />
          {errors.subject && (
            <p className="form-error" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message" className="form-label required">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`form-input ${errors.message ? "border-red-500" : ""}`}
            placeholder="Votre message"
            rows="5"
          ></textarea>
          {errors.message && (
            <p className="form-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn-cta" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
