import React from "react";
import axios from "axios";
import CommentTableRow from "./CommentTableRow";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class CommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: "", user: { guest: true }, comments: [] };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentEnter = this.handleCommentEnter.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/comments").then((res) => {
      if (res.data[0].loggedUser && !res.data[0].guest) {
        this.setState({
          user: res.data[0].loggedUser,
          comments: res.data[1],
        });
      } else {
        this.setState({
          comments: res.data[1],
        });
      }
    });
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentEnter(e) {
    if (e.keyCode === 13) {
      console.log("comment box enter");
      const emptyComment = this.state.comment.length === 0;
      const invalidComment = this.state.comment.length > 140;
      const invalidReputation = this.state.user.reputation < 100;
      if (emptyComment || invalidComment) {
        const errorMessages = [];
        if (emptyComment) {
          errorMessages.push("Comment cannot be empty!");
        }
        if (invalidComment) {
          errorMessages.push("Comment cannot be more than 140 characters!");
        }
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else if (invalidReputation) {
        const errorMessages = [];
        errorMessages.push(
          "User needs at least 100 reputation to add a comment!"
        );
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        const newComment = {
          text: this.state.comment,
          commented_by: this.state.user.username,
          owner: this.state.user._id,
        };
        axios
          .post("http://localhost:8000/addcomment", [
            newComment,
            this.props.dataType,
            this.props.data._id,
          ])
          .then((res) => {
            const error = {
              value: false,
              errors: "",
            };
            this.props.onFormError(error);
            this.props.onCommentEnter();
          });
      }
    }
  }

  render() {
    const rows = [];
    if (this.props.data.comments) {
      Array.from(this.props.data.comments).forEach((commentObject) => {
        rows.unshift(
          <CommentTableRow
            key={commentObject._id}
            cid={commentObject._id}
          ></CommentTableRow>
        );
      });
    }

    const commentBoxActive = () => {
      if (!this.state.user.guest) {
        return (
          <React.Fragment>
            {"Add comment: "}
            <input
              size={30}
              placeholder="Press enter to add new comment ..."
              onChange={this.handleCommentChange}
              onKeyUp={this.handleCommentEnter}
            ></input>
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        {rows}
        <tr>
          <td colSpan={3}>{commentBoxActive()}</td>
        </tr>
      </React.Fragment>
    );
  }
}
