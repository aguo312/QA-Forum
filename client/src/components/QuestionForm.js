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
      existingTags: [],
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleClickPostQuestion = this.handleClickPostQuestion.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/userandtagsname").then((res) => {
      if (res.data[0].loggedUser && !res.data[0].guest) {
        this.setState({
          user: res.data[0].loggedUser,
          existingTags: res.data[1],
        });
      } else {
        this.setState({
          existingTags: res.data[1],
        });
      }
    });
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

  handleClickPostQuestion(e) {
    e.preventDefault();
    console.log("posting");
    if (!this.state.user.username) {
      const errorMessages = [];
      errorMessages.push(
        "Your current session has expired. Please log in again!"
      );
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      const emptyTitle = this.state.title.length === 0;
      const emptySummary = this.state.summary.length === 0;
      const emptyText = this.state.text.length === 0;
      const emptyTags = this.state.tags.length === 0;
      const invalidTitle = this.state.title.length > 50;
      const invalidSummary = this.state.summary.length > 140;
      const invalidReputation = this.state.user.reputation < 100;
      // change tags to lowercase, remove empty spaces
      const tags = Array.from(
        new Set(
          this.state.tags
            .toLowerCase()
            .split(" ")
            .filter((s) => s !== "")
        )
      );
      const newTagObjects = [];
      tags.forEach((tagName) => {
        if (!this.state.existingTags.includes(tagName)) {
          const newTagObject = {
            name: tagName,
            owner: this.state.user._id,
          };
          newTagObjects.push(newTagObject);
        }
      });
      if (invalidReputation && newTagObjects.length > 0) {
        const errorMessages = [];
        errorMessages.push(
          "You do not have enough reputation to create new tags!"
        );
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else if (
        emptyTitle ||
        emptySummary ||
        emptyText ||
        emptyTags ||
        invalidTitle ||
        invalidSummary
      ) {
        const errorMessages = [];
        if (emptyTitle) {
          errorMessages.push("Question Title cannot be empty!");
        }
        if (invalidTitle) {
          errorMessages.push(
            "Question Title cannot be more than 50 characters!"
          );
        }
        if (emptySummary) {
          errorMessages.push("Question Summary cannot be empty!");
        }
        if (invalidSummary) {
          errorMessages.push(
            "Question Summary cannot be more than 140 characters!"
          );
        }
        if (emptyText) {
          errorMessages.push("Question Text cannot be empty!");
        }
        if (emptyTags) {
          errorMessages.push("Tags cannot be empty!");
        }
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        axios
          .post("http://localhost:8000/addtags", newTagObjects)
          .then((res) => {
            axios.get("http://localhost:8000/tags").then((res) => {
              const tagIds = tags.map((tagName) => {
                return res.data.find((tagObject) => {
                  return tagObject.name == tagName;
                })._id;
              });
              const newQuestion = {
                title: this.state.title,
                summary: this.state.summary,
                text: this.state.text,
                tags: tagIds,
                asked_by: this.state.user.username,
                owner: this.state.user._id,
              };
              axios
                .post("http://localhost:8000/addquestion", newQuestion)
                .then((res) => {
                  const error = {
                    value: false,
                    errors: "",
                  };
                  this.props.onFormError(error);
                  this.props.onQuestionsTabClick();
                });
            });
          });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="questionForm">
          <div>Question Title</div>
          Title should not be more than 50 characters.
          <br />
          <textarea id="qTitle" onChange={this.handleTitleChange}></textarea>
          <br />
          <br />
          <br />
          <div>Question Summary</div>
          Summary should not be more than 140 characters.
          <br />
          <textarea
            id="qSummary"
            onChange={this.handleSummaryChange}
          ></textarea>
          <br />
          <br />
          <br />
          <div>Question Text</div>
          Add Details
          <br />
          <textarea id="qText" onChange={this.handleTextChange}></textarea>
          <br />
          <br />
          <br />
          <div>Tags</div>
          Add Keywords separated by whitespace.
          <br />
          <textarea id="qTags" onChange={this.handleTagsChange}></textarea>
          <br />
          <br />
          <button onClick={this.handleClickPostQuestion}>Post Question</button>
        </form>
      </React.Fragment>
    );
  }
}

QuestionForm.propTypes = {
  onQuestionsTabClick: PropTypes.func,
  onFormError: PropTypes.func,
};
