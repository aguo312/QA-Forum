import React from "react";
import axios from "axios";
import DataTableRowTags from "./DataTableRowTags";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class DataTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpenQuestionInfo =
      this.handleClickOpenQuestionInfo.bind(this);
  }

  handleClickOpenQuestionInfo() {
    console.log("open question info");
    axios
      .put("http://localhost:8000/questionclick/" + this.props.question._id)
      .then((res) => {
        this.props.onQuestionInfoClick(this.props.question._id);
      });
  }

  render() {
    const localDate = new Date(this.props.question.ask_date_time).toString();
    const askedOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const askedAt = localDate.substring(16, 21);

    return (
      <tr>
        <td className="leftData">
          {this.props.question.views} Views <br />
          {this.props.question.answers.length} Answers <br />
          {0} Votes <br />
        </td>
        <td className="centerData">
          <button onClick={this.handleClickOpenQuestionInfo}>
            {this.props.question.title}
          </button>
          <div>{this.props.question.summary}</div>
          <DataTableRowTags tags={this.props.question.tags}></DataTableRowTags>
        </td>
        <td className="rightData">
          Asked By {this.props.question.asked_by}
          <br />
          On {askedOn}
          <br />
          At {askedAt}
          <br />
        </td>
      </tr>
    );
  }
}

DataTableRow.propTypes = {
  key: PropTypes.string,
  question: PropTypes.object,
  onQuestionInfoClick: PropTypes.func,
};
