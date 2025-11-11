const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

console.log("=== Server starting ===");

// Endpoint that returns fake transaction data
app.get("/api/transactions", (req, res) => {
  console.log("=== /api/transactions endpoint called ===");
  const wallet = req.query.wallet;
  console.log("Received wallet parameter:", wallet);

  if (!wallet) {
    console.log("Wallet parameter missing!");
    return res.status(400).json({ error: "Wallet address is required" });
  }

  console.log("Returning fake transaction data for debugging...");

  // Sample fake transaction data
  const sampleTransactions = [
    {
      From: "inputAddr1",
      To: "outputAddr1",
      Amount: 0.5,
      TxHash: "abc123",
      Time: 1700000000,
    },
    {
      From: "inputAddr2",
      To: "outputAddr2",
      Amount: 1.2,
      TxHash: "def456",
      Time: 1700001000,
    },
  ];

  console.log("Number of transactions returned:", sampleTransactions.length);

  res.json({ transactions: sampleTransactions });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
