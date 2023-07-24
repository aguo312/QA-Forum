import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class CommentTableRow extends React.Component {
  constructor(prop) {
    super(props);
    this.state = { comment: { text: "" } };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/comments/" + this.props.cid)
      .then((res) => {
        this.setState({
          comment: res.data,
        });
      });
  }

  render() {
    const localDate = new Date(this.state.comment_date_time).toString();
    const commentOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const commentAt = localDate.substring(16, 21);

    return (
      <tr>
        <td colSpan={2} className="leftData">
          <i>{this.state.comment.text}</i>
        </td>
        <td className="rightColumn">
          Commented By {this.state.comment.commented_by}
          <br />
          On {commentOn}
          <br />
          At {commentAt}
          <br />
        </td>
      </tr>
    );
  }
}

CommentTableRow.propTypes = {
  cid: PropTypes.string,
};
