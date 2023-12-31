import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
      user: { guest: true },
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
      if (res.data.loggedUser && !res.data.guest) {
        this.setState({
          user: res.data.loggedUser,
        });
      }
    });
  }

  handleClickQuestionsTab() {
    this.props.onQuestionsTabClick();
  }

  handleClickTagsTab() {
    this.props.onTagsTabClick();
  }

  handleClickProfileTab() {
    if (!this.state.user.guest) {
      this.props.onProfileTabClick();
    }
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
    if (!this.state.user.guest) {
      username = this.state.user.username + "'s Profile";
    }
    let questionsClass =
      this.props.tabs[0] && !this.props.searchText.value
        ? "currentTab"
        : "notCurrentTab";
    let tagsClass =
      this.props.tabs[1] && !this.props.searchText.value
        ? "currentTab"
        : "notCurrentTab";
    let profileClass = this.state.user.guest
      ? "notCurrentTab2"
      : this.props.tabs[2] && !this.props.searchText.value
      ? "currentTab"
      : "notCurrentTab";
    const askQuestionActive = () => {
      if (!this.state.user.guest) {
        return (
          <input
            type="button"
            value="Ask A Question"
            onClick={this.handleClickAskQuestion}
          ></input>
        );
      }
    };

    return (
      <div className="banner">
        <button
          className={questionsClass}
          onClick={this.handleClickQuestionsTab}
        >
          Questions
        </button>
        <button className={tagsClass} onClick={this.handleClickTagsTab}>
          Tags
        </button>
        <button className={profileClass} onClick={this.handleClickProfileTab}>
          {username}
        </button>
        <b>Q&A Forum</b>
        <input
          type="button"
          value="Log Out"
          onClick={this.handleClickLogOut}
        ></input>
        {askQuestionActive()}
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
  tabs: PropTypes.array,
};
