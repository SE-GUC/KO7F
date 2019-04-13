import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 220
  }
});

class RegisterationTextFields extends React.Component {
  state = {
    username: "",
    password: "",
    age: "",
    major: "",
    isPending: true,
    isAccepted: false,
    redirectToHome: false
  };

  renderRedirect = () => {
    if (this.state.redirectToHome) {
      return <Redirect to="/home-page" />;
    }
  };

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleChangeAge = event => {
    this.setState({ age: event.target.value });
  };

  handleChangeMajor = event => {
    this.setState({ major: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`http://localhost:4000/api/registration_forms/reg`, {
        username: this.state.username,
        password: this.state.password,
        age: this.state.age,
        major: this.state.major,
        isPending: this.state.isPending,
        isAccepted: this.state.isAccepted
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ redirectToHome: true });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          required
          type="text"
          label="username"
          name="username1"
          className={classes.textField}
          helperText="No spaces, min 6 & max 25 characters"
          onChange={this.handleChangeUsername}
          margin="normal"
        />

        <TextField
          required
          type="password"
          label="password"
          name="password"
          className={classes.textField}
          onChange={this.handleChangePassword}
          helperText="No spaces, min 6 & max 25 characters"
          margin="normal"
        />

        <TextField
          required
          type="number"
          label="age"
          name="age"
          className={classes.textField}
          onChange={this.handleChangeAge}
          margin="normal"
        />

        <TextField
          required
          type="text"
          label="major"
          name="major"
          className={classes.textField}
          onChange={this.handleChangeMajor}
          margin="normal"
        />
        {this.renderRedirect()}
        <Button type="submit" color="secondary">
          Register
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(RegisterationTextFields);
