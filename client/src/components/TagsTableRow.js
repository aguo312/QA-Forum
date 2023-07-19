import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class TagsTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      questions: [],
    };
    this.handleSetTagName = this.handleSetTagName.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/questions").then((res) => {
      this.setState({
        questions: res.data,
      });
    });
  }

  handleSetTagName(e) {
    this.setState({ tagName: "[" + e.currentTarget.id + "]" });
  }

  handleClickSearchByTag() {
    this.props.onSearchByTagClick(this.state.tagName);
  }

  render() {
    const tagTable = [];
    for (let i = 0; i < this.props.tags.length; i += 3) {
      tagTable.push(
        <tr key={i}>
          {this.props.tags.slice(i, i + 3).map((tagObj) => {
            const numQuestions = this.state.questions.filter((questionObj) => {
              return questionObj.tags.includes(tagObj._id);
            }).length;
            return (
              <td key={tagObj._id}>
                <button
                  id={tagObj.name}
                  onMouseDown={this.handleSetTagName}
                  onClick={this.handleClickSearchByTag}
                >
                  {tagObj.name}
                </button>
                <div>{numQuestions} Questions</div>
              </td>
            );
          })}
        </tr>
      );
    }
    return <React.Fragment>{tagTable}</React.Fragment>;
  }
}
