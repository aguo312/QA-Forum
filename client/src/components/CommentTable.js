import React from "react";
import axios from "axios";
import CommentTableRow from "./CommentTableRow";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class CommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: "", user: { guest: true } };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentEnter = this.handleCommentEnter.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/userdata").then((res) => {
      if (res.data.loggedUser && !res.data.guest) {
        this.setState({
          user: res.data.loggedUser,
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
    }
  }

  render() {
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
        <tr>
          <td colSpan={3}>{commentBoxActive()}</td>
        </tr>
      </React.Fragment>
    );
  }
}
