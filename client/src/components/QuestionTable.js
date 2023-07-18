import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import DataTableRowTags from "./DataTableRowTags";

axios.defaults.withCredentials = true;

export default class QuestionTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get().then((res) => {});
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Vote</th>
              <th>Title</th>
              <th>
                Answers
                <br />
                Views
                <br />
                Votes
                <br />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="leftData">
                <div>Tags</div>
              </td>
              <td className="centerData">Text</td>
              <td className="rightData">
                Asked By
                <br />
                On
                <br />
                At
                <br />
              </td>
            </tr>
            <div>Comment</div>
            <div>Rows</div>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
