import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Proyecto Final Digital House</p>
    </footer>
  );
};

export default Footer;
