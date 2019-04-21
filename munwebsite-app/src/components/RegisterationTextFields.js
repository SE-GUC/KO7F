import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import nl2br from "react-newline-to-break";

const styles = theme => ({
  container: {
    paddingTop: "4%",
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
    redirectToHome: false,
    usersList: [],
    isTaken: false
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/api/users`).then(res => {
      console.log(res.data.data);
      this.setState({
        usersList: res.data.data
      });
      console.log(this.state.usersList[1]);
    });
  }

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

  refreshIsTaken() {}

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isTaken: false });

    var isTakenAlready = false;
    for (var i = 0; i < this.state.usersList.length && !isTakenAlready; i++) {
      if (this.state.username === this.state.usersList[i].name) {
        this.setState(state => ({ isTaken: !state.isTaken }));
        isTakenAlready = true;
      }
    }

    if (!isTakenAlready) {
      axios
        .post(`http://localhost:4000/api/registration_forms`, {
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
    } else {
      this.setState({ isTaken: true });
      console.log(this.state.isTaken);
    }
  };

  render() {
    if (this.state.isTaken) {
      const { classes } = this.props;

      return (
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container spacing={100}>
            <Grid item xs={11}>
              <TextField
                error
                required
                type="text"
                label="username"
                name="username1"
                className={classes.textField}
                helperText="username is already taken"
                onChange={this.handleChangeUsername}
                margin="normal"
              />
            </Grid>

            <Grid item xs={11}>
              <TextField
                required
                type="password"
                label="password"
                name="password"
                className={classes.textField}
                onChange={this.handleChangePassword}
                helperText="No spaces between the charcters"
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                required
                type="number"
                label="age"
                name="age"
                className={classes.textField}
                onChange={this.handleChangeAge}
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                required
                type="text"
                label="major"
                name="major"
                className={classes.textField}
                onChange={this.handleChangeMajor}
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              {this.renderRedirect()}
              <Button type="submit" color="secondary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    } else {
      const { classes } = this.props;

      return (
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <Grid container spacing={100}>
            <Grid item xs={11}>
              <TextField
                required
                type="text"
                label="username"
                name="username1"
                className={classes.textField}
                helperText="No spaces between the charcters"
                onChange={this.handleChangeUsername}
                margin="normal"
              />
            </Grid>

            <Grid item xs={11}>
              <TextField
                required
                type="password"
                label="password"
                name="password"
                className={classes.textField}
                onChange={this.handleChangePassword}
                helperText="No spaces between the charcters"
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                required
                type="number"
                label="age"
                name="age"
                className={classes.textField}
                onChange={this.handleChangeAge}
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                required
                type="text"
                label="major"
                name="major"
                className={classes.textField}
                onChange={this.handleChangeMajor}
                margin="normal"
              />
            </Grid>
            <Grid item xs={11}>
              {this.renderRedirect()}
              <Button type="submit" color="secondary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    }
  }
}

export default withStyles(styles)(RegisterationTextFields);
