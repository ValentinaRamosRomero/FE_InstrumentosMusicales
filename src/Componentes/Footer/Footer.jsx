import React from "react";
import "./Footer.css";
import Logo from "../../assets/LogoFooter.svg";
import MiniaturaTwitter from "../../assets/MiniaturaTwitter.svg";
import MiniaturaFace from "../../assets/MiniaturaFace.svg";
import MiniaturaInsta from "../../assets/MiniaturaInsta.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={Logo} alt="Logo Footer" />
        <div className="socials">
          <a href="#">
            <img src={MiniaturaTwitter} alt="MiniaturaTwitter" />{" "}
          </a>
          <a href="#">
            <img src={MiniaturaFace} alt="MiniaturaFace" />{" "}
          </a>
          <a href="#">
            <img src={MiniaturaInsta} alt="MiniaturaInsta" />{" "}
          </a>
        </div>
      </div>
      <ul className="footer-right">
        <li>
          <h2>COMPAÑIA</h2>
          <ul className="box">
            <li>
              <a href="#">Acerca de</a>
            </li>
            <li>
              <a href="#">Características</a>
            </li>
            <li>
              <a href="#">Trabajos</a>
            </li>
            <li>
              <a href="#">Carrera</a>
            </li>
          </ul>
        </li>
        <li>
          <h2>AYUDA</h2>
          <ul className="box">
            <li>
              <a href="#">Atención al cliente</a>
            </li>
            <li>
              <a href="#">Detalles de entrega</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
          </ul>
        </li>
        <li>
          <h2>FAQ</h2>
          <ul className="box">
            <li>
              <a href="#">Cuenta</a>
            </li>
            <li>
              <a href="#">Gestionar entregas</a>
            </li>
            <li>
              <a href="#">Pedidos</a>
            </li>
            <li>
              <a href="#">Pagos</a>
            </li>
          </ul>
        </li>
      </ul>

      <h2>SoundKeeper © 2025, All Rights Reserved</h2>
    </footer>
  );
};

export default Footer;
