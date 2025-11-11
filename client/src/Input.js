<<<<<<< HEAD
//input.js

import React, { useState } from "react";
import Loader from "./Loader";
import GraphScreen from "./GraphScreen";
=======
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
>>>>>>> origin/master

function InputComponent() {
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const history = useHistory();
>>>>>>> origin/master

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/transactions?wallet=${inputValue}`;
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.transactions || []);
<<<<<<< HEAD
=======

>>>>>>> origin/master
      localStorage.setItem("transactions", JSON.stringify(data.transactions || []));
    } catch (error) {
      console.error("Error during fetch:", error);
    }
    setLoading(false);
  };

  return (
<<<<<<< HEAD
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Enter Wallet Address</h2>
=======
    <div>
      <h2>Transactions Table</h2>
>>>>>>> origin/master
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter wallet address..."
<<<<<<< HEAD
        style={{ width: "300px", marginRight: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: "20px" }}>
        Load Transactions
=======
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit}>Load Transactions</button>

      <button
        style={{ marginLeft: "15px" }}
        onClick={() => history.push("/graph")}
      >
        Go to Graph View
>>>>>>> origin/master
      </button>

      <Loader visible={loading} message="Fetching transactions..." />

<<<<<<< HEAD
      {/* Graph מופיע מתחת ל־Input */}
      {transactions.length > 0 && <GraphScreen transactions={transactions} />}
=======
      <h3>Transactions:</h3>
      {transactions.length === 0 && !loading && <p>No transactions yet.</p>}
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            From: {tx.From} → To: {tx.To} | Amount: {tx.Amount} BTC | Hash: {tx.TxHash}
          </li>
        ))}
      </ul>
>>>>>>> origin/master
    </div>
  );
}

export default InputComponent;
