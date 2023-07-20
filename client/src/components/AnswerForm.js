import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      question: { title: "", text: "", tags: [] },
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClickPostAnswer = this.handleClickPostAnswer.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/questions/" + this.props.qid)
      .then((res) => {
        if (res.data[0].loggedUser && !res.data[0].guest) {
          this.setState({
            user: res.data[0].loggedUser,
            question: res.data[1],
          });
        } else {
          this.setState({
            question: res.data[1],
          });
        }
      });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClickPostAnswer(e) {
    console.log("posting answer");
    e.preventDefault();
    if (!this.state.user) {
      const errorMessages = [];
      errorMessages.push(
        "Your current session has expired. Please log in again!"
      );
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else if (this.state.text.length === 0) {
      const errorMessages = [];
      errorMessages.push("Answer Text cannot be empty!");
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      const newAnswer = {
        text: this.state.text,
        ans_by: this.state.user.username,
        owner: this.state.user._id,
      };
    }
  }

  render() {
    const tags = Array.from(this.state.question.tags)
      .map((tagObject) => {
        return "[" + tagObject.name + "]";
      })
      .join(" ");
    return (
      <React.Fragment>
        <form id="answerForm">
          <div>
            Question Title: <br />
            {this.state.question.title}
            <br />
            <br />
            Question Summary: <br />
            {this.state.question.summary}
            <br />
            <br />
            Question Text: <br />
            {this.state.question.text} <br /> <br />
            Tags: <br />
            {tags}
          </div>
          <br />
          <br />
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
