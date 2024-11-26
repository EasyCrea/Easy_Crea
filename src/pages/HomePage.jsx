import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="homepage">
      <h1 className="homepage__title">
        Créez des expériences de jeu <span>uniques</span>
      </h1>

      <p className="homepage__subtitle">
        Concevez, testez et pârtagez vos deck de jeu en toute simplicité
      </p>
      <div className="homepage__actions">
        <Link to="/loginCreateur" className="btn btn-filled btn-shadow">
          Commencer maintenant <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
