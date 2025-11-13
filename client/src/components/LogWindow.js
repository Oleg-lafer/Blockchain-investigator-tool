//LogWindow.js
import { FaBitcoin } from "react-icons/fa";
import React from "react";
import styled from "styled-components";

const LogContainer = styled.div`
  width: 15%;
  height: 80%;
  background-color: #1e1e1e;
  color: #f5f5f5;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  margin-left: ${(props) => props.leftOffset || "0px"};
  margin-top: ${(props) => props.topOffset || "0px"};
`;

const ToggleButton = styled.button`
  margin-bottom: 10px;
  padding: 10px 22px;
  background: linear-gradient(145deg, #1f2733, #262f3f);
  color: #d1d8e0;
  font-weight: 500;
  font-size: 14px;
  font-family: 'Consolas', monospace;
  border: none;
  border-radius: 6px;
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

const LogMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #121212;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
`;

const LogMessage = styled.div`
  margin-bottom: 5px;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150px;
  color: #000000ff; /* צבע של ביטקוין */
`;

function LogWindow({ logMessages, visible, onToggle, leftOffset, topOffset }) {
  return (
    <LogContainer leftOffset={leftOffset} topOffset={topOffset}>
      <ToggleButton onClick={onToggle}>
        {visible ? "Hide Log" : "Show Log"}
      </ToggleButton>

      {visible ? (
        <LogMessages>
          {logMessages.length === 0 ? (
            <p style={{ color: "#888" }}>No log messages yet.</p>
          ) : (
            logMessages.map((msg, index) => (
              <LogMessage key={index}>{msg}</LogMessage>
            ))
          )}
        </LogMessages>
      ) : (
        <EmptyState>
          <FaBitcoin />
        </EmptyState>
      )}
    </LogContainer>
  );
}

export default LogWindow;
