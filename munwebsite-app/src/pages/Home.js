import React, { Component } from "react";
import NavBar from "../components/NavBar";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="Home" />
        Hello
      </div>
    );
  }
}

export default Home;
