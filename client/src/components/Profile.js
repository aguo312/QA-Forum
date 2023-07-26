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
            <td>Edit</td>
          </tr>
        );
      });

      const answersRow = [];
      Array.from(this.state.answers).forEach((answersObject) => {
        answersRow.unshift(
          <tr key={answersObject._id}>
            <td>{answersObject.text}</td>
            <td>Edit</td>
          </tr>
        );
      });

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
        </React.Fragment>
      );
    }
  }
}
