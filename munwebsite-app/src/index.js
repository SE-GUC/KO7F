import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import Events from "./pages/Events";
import DeleteUser from "./components/DeleteUser"
import CreateFAQS from "./components/CreateFAQS"
import DeleteFAQS from "./components/DeleteFAQS"
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/DeleteUser" component={DeleteUser} />
      <Route path="/CreateFAQS" component={CreateFAQS} />
      <Route path="/DeleteFAQS" component={DeleteFAQS} />
      
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
