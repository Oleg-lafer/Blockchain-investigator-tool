// server/server.js
const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

const PORT = 5000;

console.log("=== Server starting ===");

app.get("/api/transactions", (req, res) => {
  console.log("=== /api/transactions endpoint called ===");

  const wallet = req.query.wallet;
  console.log("Received wallet parameter:", wallet);

  if (!wallet) {
    console.log("Error: No wallet provided");
    return res.status(400).json({ error: "Wallet address is required" });
  }

  const url = `https://blockchain.info/rawaddr/${wallet}?cors=true`;
  console.log("Fetching blockchain data from:", url);

  request({ url, json: true }, (error, response) => {
    console.log("Request callback triggered");
    console.log("Error object:", error);
    console.log("Response status code:", response && response.statusCode);

    if (error) {
      console.error("Network error:", error);
      return res.status(500).json({ error: "Unable to connect to blockchain service" });
    }

    if (!response || !response.body) {
      console.error("Invalid response from blockchain API");
      return res.status(500).json({ error: "Invalid response from blockchain service" });
    }

    if (response.body.error) {
      console.error("Blockchain API returned error:", response.body.error);
      return res.status(400).json({ error: response.body.error });
    }

    const transactions = response.body.txs || [];
    console.log("Number of transactions found:", transactions.length);

    const simplifiedTxs = [];

    transactions.forEach((tx, index) => {
      console.log(`Processing transaction #${index + 1}:`, tx.hash);
      const txHash = tx.hash;
      const time = tx.time;

      const inputs = tx.inputs.map((i) => ({
        address: i.prev_out ? i.prev_out.addr : "Unknown",
        amount: i.prev_out ? i.prev_out.value / 100000000 : 0,
      }));

      const outputs = tx.out.map((o) => ({
        address: o.addr,
        amount: o.value / 100000000,
      }));

      // Filter only transactions where wallet is directly involved
      inputs.forEach((input) => {
        outputs.forEach((output) => {
          if (input.address === wallet || output.address === wallet) {
            simplifiedTxs.push({
              From: input.address,
              To: output.address,
              Amount: output.amount,
              TxHash: txHash,
              Time: time,
            });
          }
        });
      });
    });

    console.log("Simplified transactions prepared (filtered):", simplifiedTxs.length);
    res.json({ transactions: simplifiedTxs });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
