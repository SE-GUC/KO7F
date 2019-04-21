import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
<<<<<<< HEAD
import FAQS from './FAQS'
import Deleteu from './DeleteUser'
import CreateFAQS from './CreateFAQS'
import DeleteFAQS from './DeleteFAQS'

const options = ["Home", "Events", "FAQS", "DeleteUser", "Create FAQS","DeleteFAQS"];
=======

const options = ["Login", "Home", "Events", "FAQS", "Register"];
>>>>>>> master

const ITEM_HEIGHT = 48;

class OpenMenu extends React.Component {
  state = {
    anchorEl: null,
    redirect: false,
    clickedEntity: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = ev => {
    this.setState({ anchorEl: null });
  };

  handleRedirect = ev => {
    this.setState({ redirect: true });
    this.setState({ clickedEntity: ev.target.innerText });
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    //redirect to routes depending on the clicked entity on the menu
    if (this.state.redirect === true) {
      if (this.state.clickedEntity === "Login")
        return <Redirect push to="/login" />;
      else if (this.state.clickedEntity === "Events") {
        return <Redirect push to="/events" />;
      } else if (this.state.clickedEntity === "Home") {
<<<<<<< HEAD
        return <Redirect to="/" />;
      }
      else if (this.state.clickedEntity === "FAQS") {
        return <FAQS/>
      } else if(this.state.clickedEntity ==="DeleteUser"){
        return <Deleteu/>
      } else if(this.state.clickedEntity ==="Create FAQS"){
        return<CreateFAQS/>
      } else if(this.state.clickedEntity ==="DeleteFAQS"){
        return<DeleteFAQS/>
=======
        return <Redirect push to="/home-page" />;
      } else if (this.state.clickedEntity === "FAQS") {
        return <Redirect push to="/faqs" />;
      } else if (this.state.clickedEntity === "Register") {
        return <Redirect push to="/register" />;
>>>>>>> master
      }
      this.setState({ redirect: false });
      this.setState({ clickedEntity: null });
    }

    return (
      <div>
        <IconButton
          aria-label="Open drawer"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === ""}
              onClick={this.handleRedirect}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default OpenMenu;
