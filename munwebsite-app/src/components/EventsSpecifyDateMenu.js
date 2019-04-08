import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

class EventsSpecifyDateMenu extends React.Component {
  state = {
    open: false,
    age: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          Narrow Selection by Date
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Specify Date</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              {/* month */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Month</InputLabel>
                <Select
                  native
                  value={this.state.age}
                  onChange={this.handleChange("age")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />/<option value={0}>None</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </Select>
              </FormControl>
              {/* Years */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Year</InputLabel>
                <Select
                  native
                  value={this.state.age}
                  onChange={this.handleChange("age")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />/<option value={0}>None</option>
                  <option value={2000}>2000</option>
                  <option value={2001}>2001</option>
                  <option value={2002}>2002/</option>
                  <option value={2003}>2003</option>
                  <option value={2004}>2004</option>
                  <option value={2005}>2005</option>
                  <option value={2006}>2006</option>
                  <option value={2007}>2007</option>
                  <option value={2008}>2008</option>
                  <option value={2009}>2009</option>
                  <option value={2010}>2010</option>
                  <option value={2011}>2011</option>
                  <option value={2012}>2012</option>
                  <option value={2013}>2013</option>
                  <option value={2014}>2014</option>
                  <option value={2015}>2015</option>
                  <option value={2016}>2016</option>
                  <option value={2017}>2017</option>
                  <option value={2018}>2018</option>
                  <option value={2019}>2019</option>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EventsSpecifyDateMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsSpecifyDateMenu);
