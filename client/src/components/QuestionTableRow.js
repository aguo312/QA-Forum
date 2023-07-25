import React from "react";
import axios from "axios";
import CommentTable from "./CommentTable";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class QuestionTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answer: { text: "", ans_by: "" } };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/answers/" + this.props.aid).then((res) => {
      if (res.data[0].loggedUser && !res.data[0].guest) {
        this.setState({
          user: res.data[0].loggedUser,
          answer: res.data[1],
        });
      } else {
        this.setState({
          answer: res.data[1],
        });
      }
    });
  }

  render() {
    const localDate = new Date(this.state.answer.ans_date_time).toString();
    const ansOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const ansAt = localDate.substring(16, 21);

    return (
      <React.Fragment>
        <tr>
          <td className="leftData">Votes</td>
          <td className="centerData">{this.state.answer.text}</td>
          <td className="rightData">
            Ans By {this.state.answer.ans_by}
            <br />
            On {ansOn}
            <br />
            At {ansAt}
            <br />
          </td>
        </tr>
        <CommentTable
          dataType="answer"
          data={this.state.answer}
          onFormError={this.props.onFormError}
        ></CommentTable>
      </React.Fragment>
    );
  }
}

QuestionTableRow.propTypes = {
  aid: PropTypes.string,
};
