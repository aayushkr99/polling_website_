import React, { useState } from 'react';

const Button = ({ onClick, children, color }) => {
  const colors = color ? color : "white"
  const [buttonStyle, setButtonStyle] = useState({
    height: "50px",
    backgroundColor: "transparent",
    border: "2px solid #FF9933",
    color: colors,
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease-in-out",
  });

  const hoverStyle = {
    backgroundColor: "#FF9933",
  };

  const buttonHoverStyle = { ...buttonStyle, ...hoverStyle };

  return (
    <div>
      <button
        onClick={onClick}
        style={buttonStyle}
        onMouseEnter={() => setButtonStyle(buttonHoverStyle)}
        onMouseLeave={() => setButtonStyle(buttonStyle)}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
