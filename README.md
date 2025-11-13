
# Blockchain Investigator Tool

A web-based visualization tool for exploring blockchain transactions.
It allows investigators and analysts to trace wallet connections, examine transaction flows, and identify relationships between blockchain addresses through an interactive graph.

[Link to Demo video](https://www.youtube.com/watch?v=0YPUcXyQ6xM)
<img src="Demo.jpg" alt="Demo" width="400"/>
---

## Overview

The **Blockchain Investigator Tool** is a lightweight React application designed to help users visualize blockchain data in a clear and intuitive way.
By entering a wallet address, the system fetches transaction data from the backend, constructs a dynamic graph, and displays transaction relationships between source and destination addresses.

The tool focuses on simplicity, performance, and visual clarity — providing useful insights for blockchain research and fraud analysis.

---

## Features

* **Graph Visualization:**
  Interactive, directional graph using `react-d3-graph` to represent wallets and transactions.
  Each node corresponds to a wallet address, and each link displays the transaction amount.

* **Dynamic Dashboard:**
  Displays address details such as:

  * Total BTC sent/received
  * Number of transactions
  * Last transaction timestamp

* **Progressive Loading:**
  Load more transactions dynamically, with control over the number of records per click.

* **Logging Panel:**
  Real-time system log that tracks actions such as data fetches, node clicks, and errors.

* **Error Handling:**
  Includes a robust `ErrorBoundary` component with a user-friendly retry mechanism.

* **Responsive Design:**
  Optimized layout that adapts to various screen sizes, using `styled-components`.

---

## Technology Stack

**Frontend:**

* React (Hooks, Router)
* Styled-Components for modular styling
* React D3 Graph for data visualization
* React Icons for UI enhancement

**Backend (expected):**

* Node.js + Express (API server at `http://localhost:5000`)
* Blockchain API or internal transaction dataset

---

## Project Structure

```
client/
│
├── src/
│   ├── App.js                   # Main layout and routing
│   ├── components/
│   │   ├── WalletInputForm.js    # Wallet input & API call logic
│   │   ├── Dashboard.js          # Main graph view + dashboard
│   │   ├── TransactionsGraph.js  # Graph rendering via react-d3-graph
│   │   ├── LogWindow.js          # Side panel for event logs
│   │   └── ErrorBoundary.js      # Error fallback component
│   └── index.js
│
server/
└── server.js                     # Node.js backend handling API requests
```

---

## How It Works

1. The user enters a **wallet address** into the input field.
2. The app sends a request to the backend API:

   ```
   GET http://localhost:5000/api/transactions?wallet=<address>
   ```
3. The server returns a JSON array of transactions:

   ```json
   {
     "transactions": [
       { "From": "address1", "To": "address2", "Amount": "0.05", "Time": 1699732323 }
     ]
   }
   ```
4. The client visualizes this data as a network graph.
5. Clicking a node displays address-specific details in the right-hand dashboard.

---

## Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blockchain-investigator-tool.git
cd blockchain-investigator-tool/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

### 4. Backend setup

Ensure you have a backend API running locally at `http://localhost:5000/api/transactions`.
It should return transaction data in the format shown above.

---

## Design Notes

* The UI emphasizes dark mode for better visual comfort during investigation work.
* Every element is styled via `styled-components`, maintaining a clean and cohesive design.
* The graph layout uses gentle animation and hover highlighting for an intuitive experience.
* Long texts in dashboard cards are wrapped automatically to preserve alignment.

---


