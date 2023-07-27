import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      tags: [],
      comments: [],
      user: {},
    };
    this.handleClickDeleteQuestion = this.handleClickDeleteQuestion.bind(this);
    this.handleClickDeleteAnswer = this.handleClickDeleteAnswer.bind(this);
    this.handleClickDeleteTag = this.handleClickDeleteTag.bind(this);
    this.handleClickDeleteComment = this.handleClickDeleteComment.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/alldata/" + this.props.uid).then((res) => {
      if (res.data[0].loggedUser && !res.data[0].guest) {
        this.setState({
          user: res.data[0].loggedUser,
          questions: res.data[1],
          answers: res.data[2],
          tags: res.data[3],
          comments: res.data[4],
        });
      } else {
        this.setState({
          questions: res.data[1],
          answers: res.data[2],
          tags: res.data[3],
          comments: res.data[4],
        });
      }
    });
  }

  handleClickDeleteQuestion(qid) {
    axios.delete("http://localhost:8000/deletequestion/" + qid).then((res) => {
      console.log("deleted question");
    });
  }

  handleClickDeleteAnswer(aid) {
    axios.delete("http://localhost:8000/deleteanswer/" + aid).then((res) => {
      console.log("deleted answer");
    });
  }

  handleClickDeleteTag(tid) {
    axios.delete("http://localhost:8000/deletetag/" + tid).then((res) => {
      console.log("deleted tag");
    });
  }

  handleClickDeleteComment(cid) {
    axios.delete("http://localhost:8000/deletecomment/" + cid).then((res) => {
      console.log("deleted comment");
    });
  }

  render() {
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
    } else {
      const localDate = new Date(this.state.user.time_created).toString();
      const created =
        localDate.substring(4, 10) +
        ", " +
        localDate.substring(11, 15) +
        " at " +
        localDate.substring(16, 21);

      const questionsRow = [];
      Array.from(this.state.questions).forEach((questionObject) => {
        questionsRow.unshift(
          <tr key={questionObject._id}>
            <td>{questionObject.title}</td>
            <td>
              <button>Edit</button>
              <button
                onClick={() =>
                  this.handleClickDeleteQuestion(questionObject._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
      if (this.state.questions.length === 0) {
        questionsRow.push(
          <tr key={"none"}>
            <td colSpan={2}>No Questions Created</td>
          </tr>
        );
      }

      const answersRow = [];
      Array.from(this.state.answers).forEach((answersObject) => {
        answersRow.unshift(
          <tr key={answersObject._id}>
            <td>{answersObject.text}</td>
            <td>
              <button>Edit</button>
              <button
                onClick={() => this.handleClickDeleteAnswer(answersObject._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
      if (this.state.answers.length === 0) {
        answersRow.push(
          <tr key={"none"}>
            <td colSpan={2}>No Answers Created</td>
          </tr>
        );
      }

      const tagsRow = [];
      Array.from(this.state.tags).forEach((tagsObject) => {
        tagsRow.unshift(
          <tr key={tagsObject._id}>
            <td>{tagsObject.name}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => this.handleClickDeleteTag(tagsObject._id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      });
      if (this.state.tags.length === 0) {
        tagsRow.push(
          <tr key={"none"}>
            <td colSpan={2}>No Tags Created</td>
          </tr>
        );
      }

      const commentsRow = [];
      Array.from(this.state.comments).forEach((commentsObject) => {
        commentsRow.unshift(
          <tr key={commentsObject._id}>
            <td>{commentsObject.text}</td>
            <td>
              <button>Edit</button>
              <button
                onClick={() =>
                  this.handleClickDeleteComment(commentsObject._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
      if (this.state.comments.length === 0) {
        commentsRow.push(
          <tr key={"none"}>
            <td colSpan={2}>No Comments Created</td>
          </tr>
        );
      }

      return (
        <React.Fragment>
          <h1>{this.state.user.username}'s Profile</h1>
          <div>Account Created: {created}</div>
          <div>Reputation: {this.state.user.reputation}</div>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan={2}>
                  <h2>Created Questions: {this.state.questions.length}</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Question Title</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {questionsRow}
            </tbody>
          </table>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan={2}>
                  <h2>Created Answers: {this.state.answers.length}</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Answer Text</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {answersRow}
            </tbody>
          </table>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan={2}>
                  <h2>Created Tags: {this.state.tags.length}</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Tag Name</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {tagsRow}
            </tbody>
          </table>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan={2}>
                  <h2>Created Comments: {this.state.comments.length}</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Comment Text</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {commentsRow}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}
