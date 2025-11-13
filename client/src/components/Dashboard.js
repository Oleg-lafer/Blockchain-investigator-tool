// GraphScreen.js
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import GraphComponent from "./TransactionsGraph";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ScreenWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  color: #EAEAEA;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #d1d8e0;
    font-family: 'Consolas', monospace;
  }

  input {
    width: 60px;
    padding: 10px 12px;
    border-radius: 6px;
    border: none;
    background: linear-gradient(145deg, #1f2733, #262f3f);
    color: #d1d8e0;
    font-weight: 500;
    font-size: 14px;
    font-family: 'Consolas', monospace;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
    transition: all 0.3s ease-in-out;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 6px #4a90e2;
  }

  button {
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    background: linear-gradient(145deg, #1f2733, #262f3f);
    color: #d1d8e0;
    font-weight: 500;
    font-size: 14px;
    font-family: 'Consolas', monospace;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
    transition: all 0.3s ease-in-out;

    &:hover {
      background: linear-gradient(145deg, #262f3f, #1f2733);
      box-shadow: 0 6px 14px rgba(0,0,0,0.7);
    }

    &:active {
      background: #181f27;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
  }
`;

const GraphAndSidebar = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
`;

const GraphContainer = styled.div`
  flex: 1;
  min-width: 600px;
  height: 60vh;
  background-color: #121212;
  border: 2px solid #1e1e1e;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-in;
`;

const Dashboard = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 60vh;
`;

const Card = styled.div`
  background-color: #1b1b1b;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in;

  /* הוספה למניעת יציאה של מלל */
  word-wrap: break-word;      /* מאפשר שבירה של מילים ארוכות */
  overflow-wrap: break-word;  /* סטנדרטי יותר למקרים מודרניים */
  overflow: hidden;           /* חותך תוכן אם הוא עודף */
  text-overflow: ellipsis;    /* מוסיף ... אם המלל ארוך מדי */
  
  h4 {
    margin-bottom: 5px;
    font-size: 13px;
    color: #ccc;
  }

  p {
    font-size: 11px;
    font-weight: bold;
    color: #61DAFB;
    word-break: break-all; /* אופציונלי - שובר מילים מאוד ארוכות */
  }
`;


function GraphScreen({ transactions: propTransactions, addLogMessage }) {
  const [transactions, setTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [customCount, setCustomCount] = useState(10);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressDetails, setAddressDetails] = useState([{ address: "-", totalAmount: "-", txCount: "-", lastTxTime: "-" }]);

  useEffect(() => {
    if (propTransactions?.length) {
      setTransactions(propTransactions);
      addLogMessage?.(`Loaded ${propTransactions.length} transactions.`);
    } else {
      setTransactions([]);
      setAddressDetails([{ address: "-", totalAmount: "-", txCount: "-", lastTxTime: "-" }]);
    }
  }, [propTransactions, addLogMessage]);

  const visibleTransactions = transactions.slice(0, visibleCount);
  const nodesSet = new Set();
  const links = visibleTransactions.filter(tx => tx.From && tx.To).map(tx => {
    nodesSet.add(tx.From);
    nodesSet.add(tx.To);
    return { source: tx.From, target: tx.To, label: `${tx.Amount} BTC` };
  });
  const nodes = Array.from(nodesSet).map(id => ({ id }));
  const graphData = { nodes, links };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + customCount);
    addLogMessage?.(`Loaded ${customCount} more transactions. Total visible: ${visibleCount + customCount}`);
  };

  const handleNodeClick = nodeId => {
    setSelectedAddress(nodeId);
    const relatedTxs = transactions.filter(tx => tx.From === nodeId || tx.To === nodeId);
    setAddressDetails([{
      address: nodeId,
      totalAmount: relatedTxs.reduce((sum, tx) => sum + Number(tx.Amount), 0).toFixed(2),
      txCount: relatedTxs.length,
      lastTxTime: relatedTxs.length ? new Date(Math.max(...relatedTxs.map(tx => tx.Time)) * 1000).toLocaleString() : "-"
    }]);
    addLogMessage?.(`Selected node: ${nodeId}. Related transactions: ${relatedTxs.length}`);
  };

  return (
    <ScreenWrapper>
      <GraphAndSidebar>
        <GraphContainer>
          {transactions.length === 0 ? (
            <p style={{ color: "#61DAFB" }}>No transactions yet — enter a wallet address.</p>
          ) : (
            <GraphComponent data={graphData} onClickNode={handleNodeClick} />
          )}
        </GraphContainer>

        <Dashboard>
          {addressDetails.map((detail, idx) => (
            <React.Fragment key={idx}>
              <Card><h4>Address</h4><p>{detail.address}</p></Card>
              <Card><h4>Total BTC</h4><p>{detail.totalAmount}</p></Card>
              <Card><h4>Transactions</h4><p>{detail.txCount}</p></Card>
              <Card><h4>Last Tx</h4><p>{detail.lastTxTime}</p></Card>
            </React.Fragment>
          ))}
        </Dashboard>
      </GraphAndSidebar>

      {/* Controls מתחת לגרף */}
      <Controls style={{ marginRight: '300px' }}>
        <label>Transactions per click: 
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={customCount} 
            onChange={e => setCustomCount(Number(e.target.value))} 
          />
        </label>
        <button onClick={handleLoadMore} disabled={visibleCount >= transactions.length}>
          Load more
        </button>
      </Controls>


    </ScreenWrapper>
  );
}

export default GraphScreen;
