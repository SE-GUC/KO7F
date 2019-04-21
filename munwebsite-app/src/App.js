import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import Events from "./pages/Events";
import FAQS_Update_Page from "./pages/FAQS_Update";
import RegisterUser from "./pages/RegisterUser";
import contactUsForm from "./pages/contactUsForm.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={WelcomePage} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/home-page" component={Home} />
            <Route exact path="/faqs/:id" component={FAQS_Update_Page} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/contact-us" component={contactUsForm} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
