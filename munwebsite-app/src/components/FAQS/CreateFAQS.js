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
  class CreateFAQS extends React.Component{
      constructor(props){
          super(props)
          this.state={
                content:'',
                reply:''
          }
      }
      handlechangecontent=event=>{
          event.preventDefault();
         this.setState({content:event.target.value}) 
      }
      handlechangereply=event=>{
          event.preventDefault();
        this.setState({reply:event.target.value}) 
     }
      handlesubmit=event=>{
            event.preventDefault();
            var body = {
                reply:this.state.reply,
                content:this.state.content
            }
            axios.post('http://localhost:4000/api/faqs/',body)
            .then(res=>{
                alert('posted!')
                console.log(res.data.data)
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
                  <form onSubmit={this.handlesubmit}>
                  <label>
                    content:
                    <input type="text" value={this.state.content} onChange={this.handlechangecontent} />
                    </label> 
                    <label>
                    reply:
                    <input type="text" value={this.state.reply} onChange={this.handlechangereply} />
                    </label>
                    <Button type="submit" onClick={this.handlesubmit}>
                      Post FAQS
                    </Button>
                  </form>
              </div>
          )
      }

  }
  export default CreateFAQS
