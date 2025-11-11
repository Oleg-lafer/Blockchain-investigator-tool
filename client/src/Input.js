import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";

function InputComponent() {
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
    <div>
      <h2>Transactions Table</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter wallet address..."
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit}>Load Transactions</button>

      <button
        style={{ marginLeft: "15px" }}
        onClick={() => history.push("/graph")}
      >
        Go to Graph View
      </button>

      <Loader visible={loading} message="Fetching transactions..." />

      <h3>Transactions:</h3>
      {transactions.length === 0 && !loading && <p>No transactions yet.</p>}
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            From: {tx.From} → To: {tx.To} | Amount: {tx.Amount} BTC | Hash: {tx.TxHash}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputComponent;
