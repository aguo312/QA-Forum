import React from "react";
import axios from "axios";
import DataTableRow from "./DataTableRow";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { guest: true },
      questions: {},
    };
    // this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/userandquestions").then((res) => {
      if (res.data[0].loggedUser && !res.data[0].guest) {
        this.setState({
          user: res.data[0].loggedUser,
          questions: res.data[1],
        });
      } else {
        this.setState({
          questions: res.data[1],
        });
      }
    });
  }

  render() {
    const rows = [];

    this.state.questions.forEach((questionObject) => {
      rows.push(<DataTableRow question={questionObject}></DataTableRow>);
    });

    if (rows.length === 0) {
      rows.push(
        <tr key={"none"}>
          <td width="20%"></td>
          <td width="60%">No Questions Found</td>
          <td width="20%"></td>
        </tr>
      );
    }

    const askQuestionButtonActive = () => {
      if (!this.state.user.guest) {
        return (
          <button onClick={this.props.onAskQuestionClick}>
            Ask A Question
          </button>
        );
      } else {
        return <button hidden={true}>Ask A Question</button>;
      }
    };

    return (
      <React.Fragment>
        <table id="questions">
          <thead>
            <tr>
              <th>{this.state.questions.length} Questions</th>
              {/* <th>{tableTitle}</th> */}
              <th>Title</th>
              <th>{askQuestionButtonActive()}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          {/* <tbody></tbody> */}
        </table>
      </React.Fragment>
    );
  }
}
