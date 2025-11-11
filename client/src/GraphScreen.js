import React, { useEffect, useState } from "react";
import GraphComponent from "./graphComponent";
import { Link } from "react-router-dom";

function GraphScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const nodesSet = new Set();
  const links = transactions
    .filter((tx) => tx.From && tx.To)
    .map((tx) => {
      nodesSet.add(tx.From);
      nodesSet.add(tx.To);
      return {
        source: tx.From,
        target: tx.To,
        label: `${tx.Amount} BTC`,
      };
    });

  const nodes = Array.from(nodesSet).map((id) => ({ id }));
  const graphData = { nodes, links };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Graph View</h2>

      <Link
        to="/"
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        ← Back to Table
      </Link>

      {transactions.length === 0 ? (
        <p>No transactions to display. Please go back and load data first.</p>
      ) : (
        <div
          style={{
            width: "90%",
            height: "80vh",
            backgroundColor: "white",
            border: "2px solid #dcdde1",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <GraphComponent data={graphData} />
        </div>
      )}
    </div>
  );
}

export default GraphScreen;
