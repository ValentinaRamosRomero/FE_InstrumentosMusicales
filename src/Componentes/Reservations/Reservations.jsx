import React, { useEffect, useState } from "react";
import "../Products/ProductDetail.css";
import "./Reservations.css";
import Header from "../Header/Header";

import marcaIcon from "../../assets/icons/marca-icon.png";
import modeloIcon from "../../assets/icons/modelo-icon.png";
import condicionIcon from "../../assets/icons/condicion-icon.png";
import origenIcon from "../../assets/icons/origen-icon.png";
import lanzamientoIcon from "../../assets/icons/lanzamiento-icon.png";
import medidasIcon from "../../assets/icons/medidas-icon.png";
import Footer from "../Footer/Footer";

const Reservations = ({ product,isAuthenticated, userData }) => {
  if (!product) {
    return <p>Cargando...</p>;
  }

  const { characteristics } = product;
  const characteristicList = [
    { icon: marcaIcon, label: "Marca", value: characteristics.marca },
    { icon: modeloIcon, label: "Modelo", value: characteristics.modelo },
    {
      icon: condicionIcon,
      label: "Condición",
      value: characteristics.condicion,
    },
    { icon: origenIcon, label: "Origen", value: characteristics.origen },
    {
      icon: lanzamientoIcon,
      label: "Año de lanzamiento",
      value: characteristics.lanzamiento,
    },
    { icon: medidasIcon, label: "Medidas", value: characteristics.medidas },
  ];

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={() => {}}
      />
      <div className="reservations-container">
        <div class="progress-container">
          <div class="step-label">
            <div class="step-circle step-completed">
              <span class="checkmark">✓</span>
            </div>
            <span class="label-text">Tus datos</span>
          </div>

          <div class="connector-line connector-completed"></div>

          <div class="step-circle step-active">
            <span>2</span>
          </div>

          <div class="connector-line"></div>

          <div class="step-label">
            <div class="step-circle step-pending">
              <span class="checkmark">3</span>
            </div>
            <span class="label-text">Paso 2 de 3</span>
          </div>
        </div>

        <h2 className="reservationProduct-title">{product.name}</h2>
        <div className="reservationProduct-info">
          <img
            src={product.images}
            alt={product.name}
            className="reservationProduct-image"
          />

          <div className="reservationChars-grid">
            {characteristicList.map((item, index) => (
              <div key={index} className="reservationChar-item">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="reservationChar-icon"
                />
                <span className="reservationChar-label">{item.label}:</span>
                <span className="reservationChar-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reservations;
