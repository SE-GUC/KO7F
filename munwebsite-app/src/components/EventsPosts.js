import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
//import classnames from "classnames";
//import CardActions from "@material-ui/core/CardActions";
//import Collapse from "@material-ui/core/Collapse";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import axios from "axios";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import nl2br from "react-newline-to-break";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
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

class EventsPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoaded: false,
      expanded: false,
      isAdmin: true,
      editEvent: [],
      editNow: false,
      user_id: "",
      rating: "",
      redirectToEvents: false,
      deleteEventById: 0
    };
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/events`).then(res => {
      console.log(res.data.data);
      this.setState({
        list: res.data.data,
        isLoaded: true
      });
    });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }

  handleUserIdChange(event) {
    this.setState({ user_id: event.target.value });
  }

  handleEventClick() {
    this.setState(state => ({ isLoaded: !state.isLoaded }));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleEdit(e) {
    this.setState({ editEvent: e });
    this.setState({ editNow: true });
  }

  handleDelete(e) {
    axios.delete(`http://localhost:4000/api/events/${e._id}`).then(res => {
      console.log(res);
      console.log(res.data);
      window.location.reload();
    });
  }

  handleRate(e) {
    var headers = { "Content-Type": "application/json" };
    // const {user_id, rating} = this.state;
    var data = { user_id: this.state.user_id, rating: this.state.rating };
    axios
      .post(`http://localhost:4000/api/events/RateEvent/${e._id}`, data, {
        headers: headers
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      });
  }

  renderRedirect = () => {
    if (this.state.redirectToEvents) {
      return <Redirect to="/events" />;
    }
  };

  handleChangeName = event => {
    this.state.editEvent.name = event.target.value;
  };

  handleChangeDetails = event => {
    this.state.editEvent.details = event.target.value;
  };

  handleChangeEvent_date = event => {
    this.state.editEvent.event_date = event.target.value;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ editNow: false });

    axios
      .put(`http://localhost:4000/api/events/${this.state.editEvent._id}`, {
        name: this.state.editEvent.name,
        details: this.state.editEvent.details,
        event_date: this.state.editEvent.event_date
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ redirectToEvents: true });
        this.setState({ editNow: false });
      });
  };

  render() {
    const { classes } = this.props;
    var { list } = this.state;
    var { editNow } = this.state;
    var { editEvent } = this.state;
    const { rating, user_id } = this.state;
    if (editNow) {
      return (
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <TextField
            required
            type="text"
            label="Name"
            name="Name"
            defaultValue={editEvent.name}
            className={classes.textField}
            helperText="No spaces, min 6 & max 25 characters"
            onChange={this.handleChangeName}
            margin="normal"
          />

          <TextField
            required
            type="text"
            label="Details"
            name="details"
            defaultValue={editEvent.details}
            className={classes.textField}
            onChange={this.handleChangeDetails}
            helperText="No spaces, min 6 & max 25 characters"
            margin="normal"
          />

          <TextField
            required
            type="text"
            label="Date"
            name="event_date"
            defaultValue={editEvent.event_date}
            className={classes.textField}
            onChange={this.handleChangeEvent_date}
            margin="normal"
          />
          {this.renderRedirect()}
          <Button type="submit" color="secondary">
            Edit
          </Button>
        </form>
      );
    }

    if (this.state.isLoaded) {
      if (this.state.isAdmin) {
        return list.map(item => (
          <div>
            <div>{nl2br("")}</div>

            <Card key={item._id} className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {item.name[0]}
                  </Avatar>
                }
                action={
                  <IconButton onClick={e => this.handleEdit(item)}>
                    Edit
                  </IconButton>
                }
                title={item.name}
                subheader={moment(item.event_date).format("YYYY-MM-DD")}
              />
              <CardContent>
                <Typography component="p">{item.details}</Typography>
              </CardContent>
              <CardContent>
                <label>Rating:</label>
                <Typography component="p">{item.rating}</Typography>
              </CardContent>
              <IconButton onClick={e => this.handleDelete(item)}>
                Delete
              </IconButton>
              <br />
              <label>
                User id:
                <input
                  type="text"
                  value={this.state.user_id}
                  onChange={this.handleUserIdChange}
                />
              </label>
              <br />
              <label>
                Rating:
                <input
                  type="text"
                  value={this.state.rating}
                  onChange={this.handleRatingChange}
                />
              </label>
              <br />
              <IconButton onClick={e => this.handleRate(item)}>Rate</IconButton>
            </Card>
          </div>
        ));
      } else {
      }
    } else {
      return (
        <div>
          <div>{nl2br("")}</div>Sorry some smart guy on my team has dropped the
          database
        </div>
      );
    }
  }
}

EventsPosts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsPosts);

//if i want button to show more
/*<CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>*/
