import React from 'react'
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
import Button from '@material-ui/core/Button';
import axios from "axios";
import NavBar from "../../components/NavBar";


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
  class DeleteFAQS extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deleted_id:''
        }
    }
    handleidchange=event=>{
        event.preventDefault();
        this.setState({deleted_id:event.target.value})
    }
    handlesubmit=event=>{
        event.preventDefault();
        const id=this.state.deleted_id
        axios.delete('http://localhost:4000/api/faqs/'+id)
        .then(res=>{
            alert('deleted')
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render()
    {
        return (
            <div>
                                  <NavBar navBarTitle="Create FAQS" />
                <label>
                    FAQ ID:
                <input type="text" value={this.state.deleted_id} onChange={this.handleidchange} />
                </label>
                <Button type="submit" onClick={this.handlesubmit}>
                      Delete FAQ
                    </Button>
            </div>
        )
    }
  }
  export default DeleteFAQS