// GraphScreen.js
import React, { useEffect, useState } from "react";
import GraphComponent from "./GraphComponent";
import LogWindow from "./LogWindow";

function GraphScreen() {
  const [transactions, setTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [customCount, setCustomCount] = useState(10);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressDetails, setAddressDetails] = useState([]);
  const [logVisible, setLogVisible] = useState(true);
  const [logMessages, setLogMessages] = useState([]);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [tableVisible, setTableVisible] = useState(false); // מצב הטבלה

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
      setLogMessages((prev) => [
        ...prev,
        `Loaded ${JSON.parse(stored).length} transactions from localStorage.`,
      ]);
    }
  }, []);

  const visibleTransactions = transactions.slice(0, visibleCount);

  const nodesSet = new Set();
  const links = visibleTransactions
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + customCount);
    setLogMessages((prev) => [
      ...prev,
      `Loaded ${customCount} more transactions. Total visible: ${
        visibleCount + customCount
      }`,
    ]);
  };

  const handleNodeClick = (nodeId) => {
    setSelectedAddress(nodeId);
    const relatedTxs = transactions.filter(
      (tx) => tx.From === nodeId || tx.To === nodeId
    );
    setAddressDetails(relatedTxs);
    setLogMessages((prev) => [
      ...prev,
      `Selected node: ${nodeId}. Related transactions: ${relatedTxs.length}`,
    ]);
    setTableVisible(false); // סגור את הטבלה אוטומטית כשנבחר Node חדש
  };

  const toggleLog = () => setLogVisible((prev) => !prev);
  const toggleTable = () => setTableVisible((prev) => !prev);

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

      {transactions.length === 0 ? (
        <p>No transactions to display. Please go back and load data first.</p>
      ) : (
        <>
          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              gap: "10px",
            }}
          >
            <label>
              Transactions per click:{" "}
              <input
                type="number"
                min="1"
                max="100"
                value={customCount}
                onChange={(e) => setCustomCount(Number(e.target.value))}
                style={{ width: "60px" }}
              />
            </label>
            <button
              onClick={handleLoadMore}
              style={{
                padding: "6px 12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              disabled={visibleCount >= transactions.length}
            >
              Load more
            </button>
          </div>

          <div
            style={{
              width: "90%",
              height: "60vh",
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
            {loadingGraph && <p>Loading graph...</p>}
            <GraphComponent data={graphData} onClickNode={handleNodeClick} />
          </div>

          {/* כפתור לפתיחת/סגירת הטבלה */}
          {selectedAddress && (
            <button
              onClick={toggleTable}
              style={{
                padding: "6px 12px",
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {tableVisible ? "Hide Transactions Table" : "Show Transactions Table"}
            </button>
          )}

          {/* הטבלה עצמה */}
          {selectedAddress && tableVisible && (
            <div
              style={{
                width: "90%",
                marginTop: "20px",
                backgroundColor: "#fff",
                padding: "15px",
                border: "2px solid #dcdde1",
                borderRadius: "8px",
              }}
            >
              <h3>Address Details: {selectedAddress}</h3>
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
                  {addressDetails.map((tx, index) => (
                    <tr key={index}>
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
          )}

          {/* Log Window */}
          <LogWindow
            logMessages={logMessages}
            visible={logVisible}
            onToggle={toggleLog}
          />
        </>
      )}
    </div>
  );
}

export default GraphScreen;
