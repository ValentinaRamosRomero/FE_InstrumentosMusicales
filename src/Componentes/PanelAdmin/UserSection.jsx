import React, { useEffect, useState } from "react";
import { BsCheck2Square } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";

const UsersSection = ({ userData }) => {
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [administrators, setAdministrators] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Constantes para la API
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://g3pibackend-production.up.railway.app";
  const USERS_ENDPOINT = `${API_URL}/backoffice/users/find-all`;
  const ROLE_CHANGE_ENDPOINT = `${API_URL}/backoffice/users/change-role`;

  // Primero definimos fetchUsers
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const response = await axios({
        method: "post",
        url: USERS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {},
      });

      //Procesar los datos recibidos
      const userData = response.data.data || [];

      //Separar usuarios por rol
      const admins = userData
        .filter((user) => user.role.name === "ADMIN")
        .map((user) => ({
          id: user.id,
          nombre: `${user.firstName} ${user.lastName}`,
          email: user.email,
          canRemove: user.id !== 1,
        }));

      const regularUsers = userData
        .filter((user) => user.role.name === "USER")
        .map((user) => ({
          id: user.id,
          nombre: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }));

      setAdministrators(admins);
      setUsers(regularUsers);
      setError(null);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError(`Error al cargar usuarios: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Luego usamos fetchUsers en useEffect
  useEffect(() => {
    fetchUsers();
  }, []);

  // Y ahora changeUserRole puede llamar a fetchUsers sin problemas
  const changeUserRole = async (userId, newRoleId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      await axios({
        method: "patch",
        url: ROLE_CHANGE_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: userId,
          roleId: newRoleId,
        },
      });

      // Actualizar la lista de usuarios después de cambiar el rol
      fetchUsers();
      return true;
    } catch (err) {
      console.error("Error al cambiar rol:", err);
      setError(`Error al cambiar rol: ${err.message}`);
      return false;
    }
  };

  

  const showPromoteConfirmation = (user) => {
    setConfirmationMessage({
      user: user.nombre,
      userId: user.id,
      action: "promote",
      message: `¿Desea convertir a ${user.nombre} en administrador?`,
    });
  };

  const showRevokeConfirmation = (admin) => {
    setConfirmationMessage({
      user: admin.nombre,
      userId: admin.id,
      action: "revoke",
      message: `¿Desea revocar permisos de administrador a ${admin.nombre}?`,
    });
  };

  const confirmAction = async () => {
    if (confirmationMessage) {
      let success = false;

      if (confirmationMessage.action === "promote") {
        success = await changeUserRole(confirmationMessage.userId, 1);
      } else if (confirmationMessage.action === "revoke") {
        // Revocar permisos de admin (roleId = 2)
        success = await changeUserRole(confirmationMessage.userId, 2);
      }
      if (!success) {
        // Si hay error, mostrar mensaje pero mantener diálogo de confirmación
        return;
      }
    }
    // Limpiar el mensaje de confirmación
    setConfirmationMessage(null);
  };

  const cancelAction = () => {
    setConfirmationMessage(null);
  };

  if (loading) {
    return <div className="loading-spinner">Cargando usuarios...</div>;
  }

  return (
    <div className="content-section">
      <h1>Bienvenido Administrador{userData?.name ? ` ${userData.name}` : ""}</h1>

      {error && <div className="error-message">{error}</div>}

      {confirmationMessage && (
        <div className="confirmation-box">
          <div className="confirmation-icon">!</div>
          <div className="confirmation-message">
            {confirmationMessage.message}
          </div>
          <button className="confirm-button" onClick={confirmAction}>
            Confirmar
          </button>
          <button className="cancel-button" onClick={cancelAction}>
            Cancelar
          </button>
        </div>
      )}

      <div className="admin-tables-container">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th colSpan={2} className="table-header">
                  Administradores
                </th>
              </tr>
              <tr>
                <th>Administradores</th>
                <th>Quitar Permisos</th>
              </tr>
            </thead>
            <tbody>
              {administrators.length > 0 ? (
                administrators.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.nombre}</td>
                    <td>
                      {admin.canRemove ? (
                        <button
                          className="convert-button"
                          onClick={() => showRevokeConfirmation(admin)}
                        >
                          <CgCloseR className="icono-rojo" />
                        </button>
                      ) : (
                        <span className="minus-icon">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="no-data">
                    No hay administradores disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th colSpan={2} className="table-header">
                  Usuarios
                </th>
              </tr>
              <tr>
                <th>Usuarios</th>
                <th>Convertir en administrador</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>
                      <button
                        className="convert-button"
                        onClick={() => showPromoteConfirmation(user)}
                      >
                        <BsCheck2Square className="icono-verde" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="no-data">
                    No hay usuarios disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;