import React, { Component } from "react";
import axios from "axios";
import FAQStable from "./FAQStable";
import { Container } from "reactstrap";

class FAQS extends Component {
  state = {
    faqs: []
  };
  componentDidMount() {
    axios.get(`http://localhost:4000/api/faqs/`).then(res => {
      //   console.log(res.data.data);
      this.setState({
        faqs: res.data.data
      });
    });
  }

  render() {
    return (
      <Container>
        <FAQStable data={this.state.faqs} />
      </Container>
    );
  }
}
export default FAQS;
