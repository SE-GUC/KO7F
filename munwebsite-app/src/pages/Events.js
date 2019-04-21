import React, { Component } from "react";
import NavBar from "../components/NavBar";
import EventsSpecifyDateMenu from "../components/EventsSpecifyDateMenu";
import EventsPosts from "../components/EventsPosts";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Events extends React.Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="Events" />
        <center>
          <EventsSpecifyDateMenu />
        </center>
        <EventsPosts />
      </div>
    );
  }
}

export default Events;
