import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import InputComponent from "./Input";
import GraphScreen from "./GraphScreen";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Blockchain Investigator Tool</h1>

        {/* ניווט בין המסכים */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Transactions Table</Link>
          <Link to="/graph">Graph View</Link>
        </nav>

        {/* מסכים */}
        <Switch>
          <Route exact path="/" component={InputComponent} />
          <Route path="/graph" component={GraphScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
