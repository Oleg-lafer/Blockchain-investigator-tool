//InputComponent.js
import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import Loader from "./SpinnerLoader";
import GraphScreen from "./Dashboard";
import { GiWallet } from "react-icons/gi";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Consolas', monospace;
  color: #eaeaea;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1; /* תופס את כל הרוחב שנותר */
  display: flex; /* כדי שהשדה יתאים למלוא השטח */
`;

const WalletIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%; /* מתאים את עצמו לגודל ה-Wrapper */
  padding: 8px 8px 8px 30px; /* אפשר להפחית קצת padding-left אם רוצים */
  border: 1px solid #555;
  border-radius: 6px; /* הפינות שמאליות מעוגלות, ימניות ישרות לכפתור */
  background-color: #1b1b1b;
  color: #eaeaea;
  font-size: 14px;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 6px #4a90e2;
  }
`;

const Button = styled.button`
  padding: 10px 22px;
  background: linear-gradient(145deg, #1f2733, #262f3f);
  color: #d1d8e0;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 6px 6px 6px 6px; /* הפינות הימניות מעוגלות */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.5);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(145deg, #121922, #1a2130);
    box-shadow: 0 6px 14px rgba(0,0,0,0.7);
  }

  &:active {
    background: #0b0f15;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 6px #4a90e2;
  }
`;

const ErrorBox = styled.div`
  background-color: #2c0d0d;
  border: 1px solid #ff4d4d;
  color: #ffbaba;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 80%;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

function InputComponent({ logMessages, setLogMessages }) {
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addLogMessage = useCallback(
    msg => setLogMessages(prev => [...prev, msg]),
    [setLogMessages]
  );

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setErrorMessage("Please enter a wallet address.");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      const url = `http://localhost:5000/api/transactions?wallet=${inputValue}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText || "No response body"}`);
      }

      const data = await response.json();
      if (!data || !Array.isArray(data.transactions)) {
        throw new Error("Invalid or missing data from API");
      }

      setTransactions(data.transactions);
      addLogMessage(`Fetched ${data.transactions.length} transactions.`);
    } catch (error) {
      console.error("Error during fetch:", error);
      let friendlyMsg = "Unable to load transactions. ";
      if (error.message.includes("Failed to fetch")) {
        friendlyMsg += "Server not reachable. Make sure it’s running on http://localhost:5000.";
      } else if (error.message.includes("Server error")) {
        friendlyMsg += "The blockchain API returned an unexpected response. Please try again later.";
      } else {
        friendlyMsg += "Unexpected error: " + error.message;
      }
      setErrorMessage(friendlyMsg);
      addLogMessage(`Error: ${friendlyMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormRow>
        <InputWrapper>
          <WalletIcon><GiWallet /></WalletIcon>
          <Input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Enter wallet address..."
          />
        </InputWrapper>

        <Button onClick={handleSubmit}>Load Transactions</Button>
      </FormRow>

      <Loader visible={loading} message="Fetching transactions..." />

      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

      <GraphScreen transactions={transactions} addLogMessage={addLogMessage} />
    </Container>
  );
}

export default InputComponent;
