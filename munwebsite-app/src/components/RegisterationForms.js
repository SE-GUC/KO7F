import NavBar from "./NavBar";
import nl2br from "react-newline-to-break";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unfilteredForms: [],
      registrationFormList: [],
      usersList: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/users`).then(res => {
      console.log(res.data.data);
      this.setState({
        usersList: res.data.data
      });
      console.log(this.state.usersList[1]);
      axios.get(`http://localhost:4000/api/registration_forms`).then(res => {
        console.log(res.data.data);
        this.setState({
          unfilteredForms: res.data.data
        });
        this.refreshLists();
      });
    });
  }

  refreshLists() {
    for (var i = 0; i < this.state.unfilteredForms.length; i++) {
      var isAlike = false;
      for (var j = 0; j < this.state.usersList.length; j++) {
        if (
          this.state.unfilteredForms[i].username ===
          this.state.usersList[j].name
        ) {
          isAlike = true;
        }
      }
      if (!isAlike && this.state.unfilteredForms[i].isPending) {
        var joined = this.state.registrationFormList.concat(
          this.state.unfilteredForms[i]
        );
        this.setState({ registrationFormList: joined });
      }
    }

    console.log(this.state.registrationFormList);
  }

  handleAccept(e) {
    axios
      .post(`http://localhost:4000/api/users`, {
        name: e.username,
        password: e.password,
        age: e.age,
        major: e.major,
        admin: false
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    axios
      .delete(`http://localhost:4000/api/registration_forms/${e._id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      });
  }

  handleReject(e) {
    axios
      .delete(`http://localhost:4000/api/registration_forms/${e._id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      });
  }

  render() {
    const { classes } = this.props;
    var { registrationFormList } = this.state;

    return (
      <div>
        <NavBar navBarTitle="Pending Forms" />
        <div>{nl2br("")}</div>
        <div>{nl2br("")}</div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>username</TableCell>
                <TableCell align="right">age</TableCell>
                <TableCell align="right">major</TableCell>
                <TableCell align="right">Accept</TableCell>
                <TableCell align="right">Reject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrationFormList.map(registrationFormList => (
                <TableRow key={registrationFormList.id}>
                  <TableCell component="th" scope="registrationFormList">
                    {registrationFormList.username}
                  </TableCell>
                  <TableCell align="right">
                    {registrationFormList.age}
                  </TableCell>
                  <TableCell align="right">
                    {registrationFormList.major}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={e => this.handleAccept(registrationFormList)}
                      color="secondary"
                    >
                      Accept
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={e => this.handleReject(registrationFormList)}
                      color="secondary"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
