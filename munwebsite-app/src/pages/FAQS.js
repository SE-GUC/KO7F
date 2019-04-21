import React, { Component } from "react";
import NavBar from "../components/NavBar";
import FAQs from "../components/FAQS";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FAQS extends React.Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="FAQS" />

        <FAQs />
      </div>
    );
  }
}

export default FAQS;
