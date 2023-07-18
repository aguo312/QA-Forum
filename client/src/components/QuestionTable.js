import React from "react";
import axios from "axios";
import DataTableRowTags from "./DataTableRowTags";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class QuestionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: { tags: [], answers: [] },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/questions/" + this.props.qid)
      .then((res) => {
        this.setState({
          question: res.data,
        });
      });
  }

  render() {
    const localDate = new Date(this.state.question.ask_date_time).toString();
    const askedOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const askedAt = localDate.substring(16, 21);

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Vote</th>
              <th>{this.state.question.title}</th>
              <th>
                {this.state.question.answers.length} Answers
                <br />
                {this.state.question.views} Views
                <br />
                ? Votes
                <br />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="leftData">
                <div>
                  <DataTableRowTags
                    tags={this.state.question.tags}
                  ></DataTableRowTags>
                </div>
              </td>
              <td className="centerData">{this.state.question.text}</td>
              <td className="rightData">
                Asked By {this.state.question.asked_by}
                <br />
                On {askedOn}
                <br />
                At {askedAt}
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <div>Comment Rows</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Answer Rows</div>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
