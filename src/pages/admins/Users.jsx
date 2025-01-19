import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllUsers,
  deleteUser,
  banCreateur,
  debanCreateur,
} from "../../api/admins";

const UsersAdmin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      alert("Une erreur est survenue lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id_createur !== id));
      alert("Utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
      await fetchUsers();
    }
  };

  const handleBanToggle = async (id, isBanned) => {
    const message = isBanned
      ? "Êtes-vous sûr de vouloir débannir cet utilisateur ?"
      : "Êtes-vous sûr de vouloir bannir cet utilisateur ?";

    if (!window.confirm(message)) return;

    try {
      if (isBanned) {
        await debanCreateur(id);
      } else {
        await banCreateur(id);
      }

      setUsers((prev) =>
        prev.map((user) => {
          if (user.id_createur === id) {
            return { ...user, banned: !isBanned };
          }
          return user;
        })
      );

      alert(
        isBanned
          ? "Utilisateur débanni avec succès."
          : "Utilisateur banni avec succès."
      );
    } catch (error) {
      console.error("Erreur lors du changement de statut :", error);
      alert("Une erreur est survenue lors du changement de statut.");
      await fetchUsers();
    }
  };

  if (loading) {
    return (
      <main className="admin-content">
        <h1 className="admin-title">Utilisateurs</h1>
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <main className="admin-content">
      <h1 className="admin-title">Utilisateurs</h1>

      {/* Table pour desktop */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Genre</th>
              <th>Banni</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_createur}>
                <td>{user.id_createur}</td>
                <td>{user.nom_createur}</td>
                <td>{user.ad_email_createur}</td>
                <td>{user.genre}</td>
                <td>{user.banned ? "Oui" : "Non"}</td>
                <td>
                  <button
                    onClick={() =>
                      handleBanToggle(user.id_createur, user.banned)
                    }
                    className={`btn ${
                      user.banned ? "btn-activate" : "btn-deactivate"
                    }`}
                  >
                    {user.banned ? "Débannir" : "Bannir"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id_createur)}
                    className="btn btn-delete"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards pour mobile */}
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id_createur} className="user-card">
            <div className="user-card-field">
              <span className="user-card-label">ID:</span>
              <span className="user-card-value">{user.id_createur}</span>
            </div>

            <div className="user-card-field">
              <span className="user-card-label">Nom:</span>
              <span className="user-card-value">{user.nom_createur}</span>
            </div>

            <div className="user-card-field">
              <span className="user-card-label">Email:</span>
              <span className="user-card-value">{user.ad_email_createur}</span>
            </div>

            <div className="user-card-field">
              <span className="user-card-label">Genre:</span>
              <span className="user-card-value">{user.genre}</span>
            </div>

            <div className="user-card-field">
              <span className="user-card-label">Statut:</span>
              <span
                className={`user-card-value ${
                  user.banned ? "status-banned" : "status-active"
                }`}
              >
                {user.banned ? "Banni" : "Actif"}
              </span>
            </div>

            <div className="user-card-actions">
              <button
                onClick={() => handleBanToggle(user.id_createur, user.banned)}
                className={`btn ${
                  user.banned ? "btn-activate" : "btn-deactivate"
                }`}
              >
                {user.banned ? "Débannir" : "Bannir"}
              </button>
              <button
                onClick={() => handleDelete(user.id_createur)}
                className="btn btn-delete"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UsersAdmin;
