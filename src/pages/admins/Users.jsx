// Component listant les users et permettant de les modifier ou de les supprimer et des les bannir de la création de deck

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers, deleteUser, banCreateur } from "../../api/admins";

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
      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert("Utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  const handleBan = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir bannir cet utilisateur ?"))
      return;
    try {
      await banCreateur(id);
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === id) {
            return { ...user, banned: true };
          }
          return user;
        })
      );
      alert("Utilisateur banni avec succès.");
    } catch (error) {
      console.error("Erreur lors du bannissement :", error);
      alert("Une erreur est survenue lors du bannissement.");
    }
  };

  return (
    <main className="admin-content">
      <h1>Utilisateurs</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="deck-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Genre</th>
              <th scope="col">Banni</th>
              <th scope="col">Actions</th>
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
                    onClick={() => handleDelete(user.id_createur)}
                    className="btn btn-delete"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleBan(user.id_createur)}
                    className={
                      user.banned ? "btn btn-activate" : "btn btn-deactivate"
                    }
                  >
                    Bannir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default UsersAdmin;
