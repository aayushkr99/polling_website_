import React from 'react';

const Button = ({onClick, children}) => {
  return (
    <div>
        <button onClick={() => onClick()} style={{
                  height: "50px",
                  backgroundColor: "transparent",
                  border: "2px solid #FF9933",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "40px",
                  display: "flex",
                  alignItems: "center",
                }}>{children}</button>
      
    </div>
  );
}

export default Button;
