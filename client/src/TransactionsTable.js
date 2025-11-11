//TransactionsTable.js
import React from "react";

function TransactionsTable({ transactions }) {
  console.log("TransactionsTable props:", transactions);

  if (!transactions || transactions.length === 0) {
    return <p>No transactions loaded yet.</p>;
  }

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2>Transactions Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>From</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>To</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>TxHash</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{tx.From}</td>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{tx.To}</td>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{tx.Amount}</td>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{tx.TxHash}</td>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                {new Date(tx.Time * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;



