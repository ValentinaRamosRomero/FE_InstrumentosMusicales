import React, { useState } from "react";
import { BsCheck2Square } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";

const UsersSection2 = (userData) => {
  
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  // Estado para administradores y usuarios
    const [administrators, setAdministrators] = useState([
      { id: 1, nombre: "Administrador0", canRemove: false },
      { id: 2, nombre: "Alan Aguilar", canRemove: true },
      { id: 3, nombre: "Eduardo Iván", canRemove: true },
      { id: 4, nombre: "Gerson Huincho", canRemove: true },
      { id: 5, nombre: "Jorge Canales", canRemove: true },
      { id: 6, nombre: "Leslie Zarate", canRemove: true },
    ]);
  
    const [users, setUsers] = useState([
      { id: 1, nombre: "Omar Gonzalez" },
      { id: 2, nombre: "Oscar Sánchez" },
      { id: 3, nombre: "Sarid Herrera" },
      { id: 4, nombre: "Valentina Ramos" },
      { id: 5, nombre: "Waldir Limaco" },
      { id: 6, nombre: "Usuario Nuevo" },
    ]);
  
  const showPromoteConfirmation = (userName) => {
    setConfirmationMessage({
      user: userName,
      action: "promote",
      message: `¿Desea convertir a ${userName} en administrador?`,
    });
  };

  const showRevokeConfirmation = (userName) => {
    setConfirmationMessage({
      user: userName,
      action: "revoke",
      message: `¿Desea revocar permisos de administrador a ${userName}?`,
    });
  };

  const confirmAction = () => {
    if (confirmationMessage) {
      if (confirmationMessage.action === "promote") {
        //Promover usuario a admin
        const userIndex = users.findIndex(
          (u) => u.nombre === confirmationMessage.user
        );
        if (userIndex !== -1) {
          const user = users[userIndex];
          //Añadir a admin
          setAdministrators([
            ...administrators,
            { id: Date.now(), nombre: user.nombre, canRemove: true },
          ]);
          //Eliminar de usuarios
          setUsers(users.filter((u) => u.nombre != confirmationMessage.user));
        }
      } else if (confirmationMessage.action === "revoke") {
        //Revocar permisos de admin
        const adminIndex = administrators.findIndex(
          (a) => a.nombre === confirmationMessage.user
        );
        if (adminIndex !== -1) {
          const admin = administrators[adminIndex];
          //Añadir a usuarios
          setUsers([...users, { id: Date.now(), nombre: admin.nombre }]);
          //Eliminar de administradores
          setAdministrators(
            administrators.filter((a) => a.nombre !== confirmationMessage.user)
          );
        }
      }
    }
    // Limpiar el mensaje de confirmación
    setConfirmationMessage(null);
  };

  return (
    <div className="content-section">
      <h1>Bienvenido Administrador{userData?.name || 0}</h1>

      {confirmationMessage && (
        <div className="confirmation-box">
          <div className="confirmation-icon">!</div>
          <div className="confirmation-message">
            {confirmationMessage.message}
          </div>
          <button className="confirm-button" onClick={confirmAction}>
            Confirmar
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
              {administrators.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.nombre}</td>
                  <td>
                    {admin.canRemove ? (
                      <button
                        className="convert-button"
                        onClick={() => showRevokeConfirmation(admin.nombre)}
                      >
                        <CgCloseR className="icono-rojo" />
                      </button>
                    ) : (
                      <span className="minus-icon">-</span>
                    )}
                  </td>
                </tr>
              ))}
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>
                    <button
                      className="convert-button"
                      onClick={() => showPromoteConfirmation(user.nombre)}
                    >
                      <BsCheck2Square className="icono-verde" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersSection2;
