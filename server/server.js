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

  // --- Basic validation ---
  if (!wallet) {
    console.log("Error: No wallet provided");
    return res.status(400).json({ error: "Wallet address is required" });
  }

  const url = `https://blockchain.info/rawaddr/${wallet}?cors=true`;
  console.log("Fetching blockchain data from:", url);

  request({ url, json: true, timeout: 10000 }, (error, response) => {
    console.log("Request callback triggered");

    if (error) {
      console.error("❌ Network error:", error.message);
      return res
        .status(502)
        .json({ error: "Failed to reach blockchain API. Please try again later." });
    }

    if (!response) {
      console.error("❌ No response from blockchain.info");
      return res
        .status(503)
        .json({ error: "No response from blockchain service. Try again later." });
    }

    const { statusCode, body } = response;

    if (statusCode !== 200) {
      console.error(`❌ API returned status ${statusCode}`);
      return res
        .status(statusCode)
        .json({ error: `Blockchain API returned status ${statusCode}` });
    }

    if (!body || typeof body !== "object") {
      console.error("❌ Invalid JSON from blockchain API");
      return res
        .status(500)
        .json({ error: "Unexpected data format from blockchain service" });
    }

    if (body.error) {
      console.error("Blockchain API error:", body.error);
      return res.status(400).json({ error: body.error });
    }

    const transactions = body.txs || [];
    console.log("Number of transactions found:", transactions.length);

    const simplifiedTxs = [];

    transactions.forEach((tx, index) => {
      try {
        const txHash = tx.hash;
        const time = tx.time;
        const inputs = (tx.inputs || []).map((i) => ({
          address: i.prev_out ? i.prev_out.addr : "Unknown",
          amount: i.prev_out ? i.prev_out.value / 100000000 : 0,
        }));

        const outputs = (tx.out || []).map((o) => ({
          address: o.addr,
          amount: o.value / 100000000,
        }));

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
      } catch (err) {
        console.error(`⚠️ Error processing transaction #${index}:`, err.message);
      }
    });

    console.log("Simplified transactions prepared:", simplifiedTxs.length);
    res.json({ transactions: simplifiedTxs });
  });
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
