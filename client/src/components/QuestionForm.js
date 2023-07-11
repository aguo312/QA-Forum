import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <div>Question Form</div>
      </React.Fragment>
    );
  }
}
