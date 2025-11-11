//app.js


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InputComponent from "./Input";
import TransactionsTable from "./TransactionsTable";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Blockchain Investigator Tool</h1>

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
