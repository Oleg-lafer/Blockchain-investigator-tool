//input.js

import React, { useState } from "react";
import Loader from "./Loader";
import GraphScreen from "./GraphScreen";

function InputComponent() {
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/transactions?wallet=${inputValue}`;
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.transactions || []);
      localStorage.setItem("transactions", JSON.stringify(data.transactions || []));
    } catch (error) {
      console.error("Error during fetch:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Enter Wallet Address</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter wallet address..."
        style={{ width: "300px", marginRight: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: "20px" }}>
        Load Transactions
      </button>

      <Loader visible={loading} message="Fetching transactions..." />

      {/* Graph מופיע מתחת ל־Input */}
      {transactions.length > 0 && <GraphScreen transactions={transactions} />}
    </div>
  );
}

export default InputComponent;
