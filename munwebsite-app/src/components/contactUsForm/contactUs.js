import "./contactUs.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ContactFormSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      message: "",
      mailSent: false
    };
  }

  renderRedirect = () => {
    if (this.state.mailSent) {
      return <Redirect to="/home-page" />;
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`http://localhost:4000/api/contact-us`, {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        message: this.state.message
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ mailSent: true });
      });
  };

  render() {
    return (
      <div className="App">
        <div>
          <form action="#" onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input
              required
              type="text"
              id="fname"
              name="firstname"
              placeholder="Your name.."
              value={this.state.fname}
              onChange={e => this.setState({ fname: e.target.value })}
            />

            <label>Last Name</label>
            <input
              required
              type="text"
              id="lname"
              name="lastname"
              placeholder="Your last name.."
              value={this.state.lname}
              onChange={e => this.setState({ lname: e.target.value })}
            />

            <label>Email</label>
            <input
              required
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <label>Message</label>
            <textarea
              required
              id="message"
              name="message"
              placeholder="Write something.."
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
            />
            {this.renderRedirect()}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default ContactFormSubmit;
