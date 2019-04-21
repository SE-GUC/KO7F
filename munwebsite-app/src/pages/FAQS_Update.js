import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {  BrowserRouter as Router, Route,Redirect } from "react-router-dom";

class FAQS_Update_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      content: "",
      faq:{
          reply:"",
          content:"",
      }
    };
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/faqs/${this.props.match.params.id}`).then(res => {
      console.log(res.data.data);
      this.setState({
        faq: res.data.data,
        isLoaded: true
      });
    });
  }


  handleReplyChange(event){
    this.setState({reply: event.target.value});
  }
  handleContentChange(event){
    this.setState({content: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/api/faqs/${this.props.match.params.id}`, {
        reply: this.state.reply,
        content: this.state.content
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ reply: "" });
        this.setState({ content: "" });
      });
  };

  render() {
    const { classes } = this.props;
    const {reply, content,faq} = this.state;
    return(
        <div>
        <h1>FAQ</h1>
        <h3>Reply: {faq.reply}</h3>
        <h3>Content: {faq.content}</h3>
        <br />
        <form onSubmit= {this.handleSubmit}>
            <label>
                Reply:
                <input type="text" value = {this.state.reply} onChange={this.handleReplyChange} />
            </label>
            <label>
                content:
                <input type="text" value = {this.state.content} onChange={this.handleContentChange} />
            </label>
            <input type="submit" value="Update FAQ" />
        </form>
        </div>
    );
  };
}


export default FAQS_Update_Page;
