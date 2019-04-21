import React, { Component } from "react";
import axios from "axios";
import FAQStable from "./FAQStable";
import { Container } from "reactstrap";
import NavBar from "../../components/NavBar";
import CreateFAQS from './CreateFAQS';
import {Redirect} from "react-router-dom"


class FAQS extends Component {
  state = {
    faqs: [],
    create:false
  };
  componentDidMount() {
    axios.get(`http://localhost:4000/api/faqs/`).then(res => {
      //   console.log(res.data.data);
      this.setState({
        faqs: res.data.data
      });
    });
  }
  rendercreate(){
    this.setState({create:true})
  }
  render() {
    if(!this.state.create){
    return (
      <Container>
        <NavBar navBarTitle="FAQS" />
        <FAQStable data={this.state.faqs}/>
        <button onClick={()=>this.rendercreate()}>Create FAQS</button>
      </Container>
    );
  }else{
    return(<CreateFAQS/>)
    
  }
}
}
export default FAQS;
