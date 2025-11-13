// App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import InputComponent from "./components/WalletInputForm";
//import TransactionsTable from "./TransactionsTable";
import LogWindow from "./components/LogWindow";
import ErrorBoundary from "./components/ErrorBoundary";

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #0E1117;
    color: #EAEAEA;
  }
`;

const AppContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row; /* קומפוננטות בשורה */
  align-items: flex-start;
  height: 72vh; /* תופס את כל גובה המסך */
`;

const MainContent = styled.div`
  flex: 1; /* התוכן הראשי יתפוס את שאר החלל */
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* גלילה אם התוכן גבוה */
`;

function App() {
  const [logMessages, setLogMessages] = useState([]);
  const [logVisible, setLogVisible] = useState(true);

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
      <LogWindow
        logMessages={logMessages}
        visible={logVisible}
        onToggle={() => setLogVisible(!logVisible)}
        leftOffset="20px"  // מרחק מהצד השמאלי
        topOffset="110px"   // מרחק מהחלק העליון
      />


        <MainContent>
          <ErrorBoundary>
            <InputComponent logMessages={logMessages} setLogMessages={setLogMessages} />
          </ErrorBoundary>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
