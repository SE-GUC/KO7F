import React, { Component } from "react";
import NavBar from "../components/NavBar";
import RegisterationTextFields from "../components/RegisterationTextFields";

class RegisterUser extends React.Component {
  render() {
    return (
      <div>
        <NavBar navBarTitle="Register" />
        <center>
          <RegisterationTextFields />
        </center>
      </div>
    );
  }
}

export default RegisterUser;
