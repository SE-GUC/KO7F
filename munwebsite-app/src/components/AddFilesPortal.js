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
import NavBar from '../components/NavBar'

class AddFilesPortal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            details:''
        }
    }
    handlechangetitle=event=>{
        event.preventDefault();
        this.setState({title:event.target.value})
    }
    handlechangedetails=event=>{
        event.preventDefault();
        this.setState({details:event.target.value})
    }
    handleclick=event=>{
        event.preventDefault(); 
        const payload={
            title:this.state.title,
            details:this.state.details
        }
        axios.post('http://localhost:4000/api/portal_libraries/',payload)
        .then(res=>{
            alert('posted')
            console.log(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                  <NavBar navBarTitle="Portal Libraries" />
                  <form onSubmit={this.handlesubmit}>
                  <label>
                    title:
                    <input type="text" value={this.state.title} onChange={this.handlechangetitle} />
                    </label> 
                    <label>
                    details:
                    <input type="text" value={this.state.reply} onChange={this.handlechangedetails} />
                    </label>
                    <Button type="submit" onClick={this.handleclick}>
                      Post File
                    </Button>
                  </form>
              </div>
        )
    }
}
export default AddFilesPortal