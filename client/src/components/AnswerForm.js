import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClickPostAnswer = this.handleClickPostAnswer.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClickPostAnswer() {
    console.log("posting answer");
  }

  render() {
    return (
      <React.Fragment>
        <form id="answerForm">
          <div>Answer Text</div>
          <br />
          <textarea id="aText" onChange={this.handleTextChange}></textarea>
          <br />
          <br />
          <button onClick={this.handleClickPostAnswer}>Post Answer</button>
        </form>
      </React.Fragment>
    );
  }
}
