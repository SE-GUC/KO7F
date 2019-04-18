import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ContactFormSubmit from "../components/contactUsForm/contactUs";

class contactUsForm extends React.Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="Contact Us" />

        <ContactFormSubmit />
      </div>
    );
  }
}

export default contactUsForm;
