import React from "react";

function Loader({ visible, message = "Loading..." }) {
  if (!visible) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "3px solid #ccc",
          borderTop: "3px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <span>{message}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
