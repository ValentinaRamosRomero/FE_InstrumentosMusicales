import React from "react";
import "./PanelAdmin.css";
import Header from "../Header/Header";
import { CgCloseR } from "react-icons/cg";
import { BsCheck2Square } from "react-icons/bs";
const PanelAdmin = () => {
  return (
    <>
      <Header />
      <h1>Bienvenido Administrador</h1>
      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th colSpan={3}>Usuarios Registrados</th>
            </tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Administrar Permisos</th>
          </thead>
          <tbody>
            <tr>
              <td>Administrador0</td>
              <td>Administrador</td>
              <td>
                <CgCloseR className="icono-rojo" />
              </td>
            </tr>
            <tr>
              <td>Alan Aguilar</td>
              <td>Usuario</td>
              <td>
                <BsCheck2Square className="icono-verde" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PanelAdmin;
