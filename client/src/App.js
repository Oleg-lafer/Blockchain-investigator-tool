<<<<<<< HEAD
//app.js

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import InputComponent from "./Input";
import TransactionsTable from "./TransactionsTable";
=======
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import InputComponent from "./Input";
import GraphScreen from "./GraphScreen";
>>>>>>> origin/master

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Blockchain Investigator Tool</h1>

        {/* ניווט בין המסכים */}
        <nav style={{ marginBottom: "20px" }}>
<<<<<<< HEAD
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/table">Transactions Table</Link>
=======
          <Link to="/" style={{ marginRight: "15px" }}>Transactions Table</Link>
          <Link to="/graph">Graph View</Link>
>>>>>>> origin/master
        </nav>

        {/* מסכים */}
        <Switch>
          <Route exact path="/" component={InputComponent} />
<<<<<<< HEAD
          <Route path="/table" component={TransactionsTable} />
=======
          <Route path="/graph" component={GraphScreen} />
>>>>>>> origin/master
        </Switch>
      </div>
    </Router>
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> origin/master
