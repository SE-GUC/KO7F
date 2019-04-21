import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class WelcomePage extends Component {
  state = {
    loginToMun: false,
    continueWithoutLogin: false,
    register: false
  };

  handleClickLogin = () => {
    this.setState({ loginToMun: true });
  };

  handleClickWithoutLogin = () => {
    this.setState({ continueWithoutLogin: true });
  };

  handleClickRegister = () => {
    this.setState({ register: true });
  };

  render() {
    if (this.state.loginToMun === true) {
      return <Redirect to="/login" />;
    } else if (this.state.continueWithoutLogin === true) {
      return <Redirect to="/home-page" />;
    } else if (this.state.register === true) {
      return <Redirect to="/register" />;
    }

    return (
      <div>
        <NavBar navBarTitle="Welcome To MUN Website" />
        <br />
        <center>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleClickLogin}
          >
            Login
          </Button>
        </center>
        <br />
        <center>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleClickWithoutLogin}
          >
            Continue without logging in
          </Button>
        </center>
        <br />
        <center>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleClickRegister}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomePage);
