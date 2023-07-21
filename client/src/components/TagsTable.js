import React from "react";
import axios from "axios";
// import TagsTableRow from "./TagsTableRow";
import PropTypes from "prop-types";
import TagsTableRow from "./TagsTableRow";

axios.defaults.withCredentials = true;

export default class TagsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/tags").then((res) => {
      this.setState({
        tags: res.data,
      });
    });
  }

  handleClickSearchByTag(tagName) {
    this.props.onSearchByTagClick(tagName);
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>{this.state.tags.length} Tags</th>
              <th>All Tags</th>
              <th>
                <button onClick={this.props.onAskQuestionClick}>
                  Ask A Question
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <TagsTableRow
              tags={this.state.tags}
              onSearchByTagClick={this.handleClickSearchByTag}
            ></TagsTableRow>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

TagsTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onSearchByTagClick: PropTypes.func,
};
