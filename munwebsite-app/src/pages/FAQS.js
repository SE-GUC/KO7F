import React, { Component } from "react";
import NavBar from "../components/NavBar";
import EventsSpecifyDateMenu from "../components/EventsSpecifyDateMenu";
import EventsPosts from "../components/EventsPosts";
import FAQS from '../components/FAQS';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FAQS extends React.Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="FAQS" />
        {/* <center>
          <EventsSpecifyDateMenu />
        </center> */}
        <FAQS />
      </div>
    );
  }
}

export default FAQS;
