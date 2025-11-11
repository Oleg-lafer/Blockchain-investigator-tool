import React from "react";

function LogWindow({ logMessages, visible, onToggle }) {
  return (
    <div
      style={{
        width: "90%",
        marginTop: "20px",
        backgroundColor: "#1e1e1e",
        color: "#f5f5f5",
        border: "2px solid #333",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          marginBottom: "10px",
          padding: "6px 12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {visible ? "Hide Log" : "Show Log"}
      </button>

      {visible && (
        <div
          style={{
            maxHeight: "200px",
            overflowY: "scroll",
            backgroundColor: "#121212",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {logMessages.length === 0 ? (
            <p style={{ color: "#888" }}>No log messages yet.</p>
          ) : (
            logMessages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "5px", fontFamily: "monospace", fontSize: "12px" }}>
                {msg}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default LogWindow;
