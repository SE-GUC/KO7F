import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
//import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  }
});

class EventsPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: "",
      details: "",
      user_id: "",
      rating: "",
      isLoaded: false,
      expanded: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    // this.handleUserIdChange = this.handleUserIdChange.bind(this);
    // this.handleRatingChange = this.handleRatingChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleNameChange(event) {
    this.setState({name: event.target.name});
  }
  handleDetailsChange(event) {
    this.setState({details: event.target.details});
  }

  handleSubmit(event) {
    event.preventDefault();
    const n=this.state.name
    const d= this.state.details
    axios.post(`http://localhost:4000/api/events`,{n,d}).then(res => {
      console.log(res.data.data);
      this.setState({
        name: "",
        details: ""
      });
    });
  }

  handleSubmitRating(event,rating_id) {
    event.preventDefault();
    const r=this.state.rating
    const u= this.state.user_id
    axios.post(`http://localhost:4000/api/RateEvent/`+rating_id,{r,u}).then(res => {
      console.log(res.data.data);
      this.setState({
        user_id: "",
        rating: ""
      });
    });
  }

  handleEventClick() {
    this.setState(state => ({ isLoaded: !state.isLoaded }));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
      
    const { classes } = this.props;
    var { list, name, details } = this.state;
 
    // <form onSubmit={this.handleSubmit}>
    //     <label>
    //       Name:
    //       <input type="text" value={this.state.name} onChange={this.handleNameChange} />
    //     </label>
    //     <label>
    //       Detials:
    //       <input type="text" value={this.state.details} onChange={this.handleDetialsChange} />
    //     </label>
    //     <input type="submit" value="Submit" />
    // </form>
    

    if (this.state.isLoaded) {
      return list.map(item => (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={item.name}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography component="p">{item.details}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
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

          <label>
            User id:
            <input type="text" value={this.state.user_id} onChange={this.handleUserIdChange} />
          </label>

          <label>
            Rating:
            <input type="text" value={this.state.rating} onChange={this.handleRatingChange} />
          </label>
          <button onClick={this.handleSubmitRating.bind(this,item.id)}>
            Rate
          </button>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ));
    } else {
      return (
        <div>Sorry some smart guy on my team has dropped the database</div>
      );
    }
  }
}

EventsPosts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsPosts);
