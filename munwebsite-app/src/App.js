import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import Events from "./pages/Events";
import RegisterUser from "./pages/RegisterUser";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={WelcomePage} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/home-page" component={Home} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/register" component={RegisterUser} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
