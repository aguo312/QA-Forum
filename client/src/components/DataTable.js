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
    this.handleClickQuestionInfo = this.handleClickQuestionInfo.bind(this);
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

  handleClickQuestionInfo(qid) {
    this.props.onQuestionInfoClick(qid);
  }

  render() {
    const rows = [];
    const searchedQuestions = [];
    if (this.props.searchText.value) {
      const searchTargets = this.props.searchText.search
        .toLowerCase()
        .split(" ");
      Array.from(this.state.questions).forEach((questionObject) => {
        const questionTitle = questionObject.title.toLowerCase().split(" ");
        const questionSummary = questionObject.summary.toLowerCase().split(" ");
        const questionText = questionObject.text.toLowerCase().split(" ");
        const questionTags = questionObject.tags.map((tagObject) => {
          return "[" + tagObject.name + "]";
        });
        const questionWordAndTag = questionTitle
          .concat(questionSummary)
          .concat(questionText)
          .concat(questionTags);
        if (
          searchTargets.filter((target) => {
            return questionWordAndTag.includes(target);
          }).length > 0
        ) {
          searchedQuestions.push(questionObject);
        }
      });
    }
    if (this.props.searchText.value) {
      searchedQuestions.forEach((questionObject) => {
        rows.push(
          <DataTableRow
            key={questionObject._id}
            question={questionObject}
            onQuestionInfoClick={this.handleClickQuestionInfo}
          ></DataTableRow>
        );
      });
    } else {
      Array.from(this.state.questions).forEach((questionObject) => {
        rows.push(
          <DataTableRow
            key={questionObject._id}
            question={questionObject}
            onQuestionInfoClick={this.handleClickQuestionInfo}
          ></DataTableRow>
        );
      });
    }

    if (rows.length === 0) {
      rows.push(
        <tr key={"none"}>
          <td className="leftData"></td>
          <td className="centerData">No Questions Found</td>
          <td className="rightData"></td>
        </tr>
      );
    }

    const numQuestions = this.props.searchText.value
      ? searchedQuestions.length
      : this.state.questions.length;

    const tableTitle = this.props.searchText.value
      ? this.props.searchText.tagsOnly
        ? "Questions tagged " + this.props.searchText.search
        : "Search Results"
      : "All Questions";

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
              <th>{numQuestions} Questions</th>
              <th>{tableTitle}</th>
              <th>{askQuestionButtonActive()}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </React.Fragment>
    );
  }
}
