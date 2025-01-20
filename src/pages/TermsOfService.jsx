const TermsOfService = () => {
  return (
    <div className="terms-of-service-container">
      <h1 className="terms-of-service-title">Conditions d&apos;Utilisation</h1>
      <p className="terms-of-service-intro">
        Bienvenue sur notre plateforme de création de decks à thèmes, conçue
        pour offrir une expérience ludique et créative. En utilisant ce site,
        vous acceptez les conditions suivantes :
      </p>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">
          1. Objectif de la plateforme
        </h2>
        <p className="terms-of-service-text">
          Ce site web vous permet de créer des cartes pour des decks à thèmes,
          qui peuvent ensuite être joués sur notre application mobile dédiée.
          Les créateurs doivent se connecter pour créer des cartes dans un deck
          en cours de création.
        </p>
      </section>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">2. Comportement attendu</h2>
        <p className="terms-of-service-text">
          Pour garantir une expérience agréable et respectueuse pour tous, vous
          acceptez de :
        </p>
        <ul className="terms-of-service-list">
          <li>Créer des cartes dans un esprit équilibré et amusant.</li>
          <li>
            Éviter tout contenu obscène, dégradant, raciste, ou offensant.
          </li>
          <li>
            Respecter les thèmes et l’objectif du deck en cours de création.
          </li>
        </ul>
      </section>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">3. Modération</h2>
        <p className="terms-of-service-text">
          Nous nous réservons le droit de modérer ou de supprimer tout contenu
          qui ne respecte pas ces conditions, à notre entière discrétion.
        </p>
      </section>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">
          4. Responsabilité de l&apos;utilisateur
        </h2>
        <p className="terms-of-service-text">
          En tant que créateur, vous êtes seul responsable du contenu que vous
          proposez. Assurez-vous que votre contribution respecte les lois et
          règlements en vigueur.
        </p>
      </section>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">
          5. Modification des conditions
        </h2>
        <p className="terms-of-service-text">
          Ces conditions peuvent être modifiées à tout moment. Nous vous
          encourageons à consulter cette page régulièrement pour rester informé
          des mises à jour.
        </p>
      </section>

      <section className="terms-of-service-section">
        <h2 className="terms-of-service-subtitle">
          6. Acceptation des conditions
        </h2>
        <p className="terms-of-service-text">
          En utilisant ce site, vous reconnaissez avoir lu, compris et accepté
          ces conditions d&apos;utilisation.
        </p>
      </section>

      <p className="terms-of-service-conclusion">
        Merci de faire partie de notre communauté et de contribuer à une
        expérience positive pour tous les utilisateurs !
      </p>
    </div>
  );
};

export default TermsOfService;
