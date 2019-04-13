import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import NavBar from "../components/NavBar";
import { login, logout } from "../gloabalState/actions/authActions";
//import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <NavBar navBarTitle="Login" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="name"
              placeholder="username"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name
              })}
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedUser: state.auth.loggedUser
});

export default connect(
  mapStateToProps,
  { login, logout }
)(Login);
