import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
      username: { user: { username: "guest" }, guest: true },
    };
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickProfileTab = this.handleClickProfileTab.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/userdata").then((res) => {
      this.setState({
        username: {
          user: res.data.loggedUser,
          guest: res.data.guest,
        },
      });
    });
  }

  handleClickQuestionsTab() {
    this.props.onQuestionsTabClick();
  }

  handleClickTagsTab() {
    this.props.onTagsTabClick();
  }

  handleClickProfileTab() {
    // temporary
    this.props.onProfileTabClick();
  }

  handleSearchTextChange(e) {
    this.setState({ searchBox: e.target.value });
  }

  handleSearchTextEnter(e) {
    if (e.keyCode === 13) {
      this.props.onSearchTextEnter(this.state.searchBox);
    }
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick();
  }

  handleClickLogOut() {
    axios
      .post("http://localhost:8000/logout")
      .then((res) => this.props.onLogOutClick());
  }

  render() {
    let username = "Guest User";
    if (!this.state.username.guest) {
      username = this.state.username.user.username + "'s Profile";
    }
    return (
      <div className="banner">
        <a onClick={this.handleClickQuestionsTab}>Questions</a>
        <a onClick={this.handleClickTagsTab}>Tags</a>
        <a onClick={this.handleClickProfileTab}>{username}</a>
        <b>Q&A Forum</b>
        <input
          type="button"
          value="Log Out"
          onClick={this.handleClickLogOut}
        ></input>
        <input
          type="text"
          id="searchBox"
          placeholder="Search ..."
          onChange={this.handleSearchTextChange}
          onKeyUp={this.handleSearchTextEnter}
        ></input>
      </div>
    );
  }
}

Banner.propTypes = {
  onQuestionsTabClick: PropTypes.func,
  onTagsTabClick: PropTypes.func,
  onProfileTabClick: PropTypes.func,
  onAskQuestionClick: PropTypes.func,
  onSearchTextEnter: PropTypes.func,
  onLogOutClick: PropTypes.func,
};
