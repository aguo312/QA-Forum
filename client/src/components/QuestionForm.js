import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      text: "",
      tags: "",
      user: {},
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSummaryChange(e) {
    this.setState({ summary: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleTagsChange(e) {
    this.setState({ tags: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <form id="questionForm">
          <label>
            <div>Question Title</div>
            Title should not be more than 50 characters.
            <br />
          </label>
          <textarea
            id="qTitle"
            name="qTitle"
            value={this.state.title}
            onChange={this.handleTitleChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Question Summary</div>
            Summary should not be more than 140 characters.
            <br />
          </label>
          <textarea
            id="qSummary"
            name="qSummary"
            value={this.state.summary}
            onChange={this.handleSummaryChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Question Text</div>
            Add Details
            <br />
          </label>
          <textarea
            id="qText"
            name="qText"
            value={this.state.text}
            onChange={this.handleTextChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Tags</div>
            Add Keywords separated by whitespace.
            <br />
          </label>
          <textarea
            id="qTags"
            name="qTags"
            value={this.state.tags}
            onChange={this.handleTagsChange}
          ></textarea>
          <br />
          <br />
          <input
            type="button"
            id="postQuestionButton"
            value="Post Question"
            onClick={this.handleClickPostQuestion}
          ></input>
        </form>
      </React.Fragment>
    );
  }
}
