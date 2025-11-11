//app.js

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import InputComponent from "./Input";
import TransactionsTable from "./TransactionsTable";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Blockchain Investigator Tool</h1>

        {/* ניווט בין המסכים */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/table">Transactions Table</Link>
        </nav>

        {/* מסכים */}
        <Switch>
          <Route exact path="/" component={InputComponent} />
          <Route path="/table" component={TransactionsTable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

