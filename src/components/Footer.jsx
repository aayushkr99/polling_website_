import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p>&copy; 2024 Jeera Portal</p>
        <p>ak858098@gmail.com</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "0.2rem",
  position: "fixed",
  bottom: "0",
  width: "100%",
};

const containerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
};

export default Footer;
