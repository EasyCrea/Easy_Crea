import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateCard from "../CreateCard";

const CreateCardPage = () => {
  const { id_deck } = useParams();
  const navigate = useNavigate();

  // Fonction à appeler après la création d'une carte
  const handleCardCreated = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="create-card-page">
      <h2 className="create-card-page__title">
        Créer la première carte du deck
      </h2>
      <CreateCard id_deck={id_deck} onCardCreated={handleCardCreated} />
    </div>
  );
};

export default CreateCardPage;
