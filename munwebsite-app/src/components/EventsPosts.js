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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import moment from "moment";

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
      isLoaded: false,
      expanded: false
    };
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

  handleEventClick() {
    this.setState(state => ({ isLoaded: !state.isLoaded }));
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    var { list } = this.state;
    if (this.state.isLoaded) {
      return list.map(item => (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {item.name[0]}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={item.name}
            subheader={moment(item.event_date).format("YYYY-MM-DD")}
          />
          <CardContent>
            <Typography component="p">{item.details}</Typography>
          </CardContent>
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
