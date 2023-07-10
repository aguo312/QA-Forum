import React from "react";
import axios from "axios";
import Welcome from "./Welcome";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Banner from "./Banner";
import ErrorMessage from "./ErrorMessage";

axios.defaults.withCredentials = true;

export default class QAForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      errorMsg: { value: false, errors: [] },
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickGuest = this.handleClickGuest.bind(this);
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickProfileTab = this.handleClickProfileTab.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
  }

  componentDidMount() {}

  handleClickLogin() {
    this.setState({
      showWelcome: false,
      showLoginForm: true,
      showRegisterForm: false,
    });
    console.log("login");
  }

  handleClickRegister() {
    this.setState({
      showWelcome: false,
      showRegisterForm: true,
    });
    console.log("register");
  }

  handleClickBack() {
    this.setState({
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      errorMsg: { value: false, errors: [] },
    });
    console.log("back");
  }

  handleClickGuest() {
    this.setState({
      showWelcome: false,
      showBanner: true,
    });
    console.log("guest");
  }

  handleClickQuestionsTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: true,
      showTagsTab: false,
      showProfileTab: false,
    });
  }

  handleClickTagsTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: true,
      showProfileTab: false,
    });
  }

  handleClickProfileTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: true,
    });
  }

  handleClickAskQuestion() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: true,
    });
  }

  handleSearchTextEnter(search) {
    this.setState({
      showBanner: true,
      searchText: { value: true, tagsOnly: false, search: search },
      showQuestionsTab: { value: true, page: 0 },
    });
  }

  handleLoggedIn() {
    this.setState({
      showLoginForm: false,
      showBanner: true,
      showQuestionsTab: true,
    });
  }

  handleClickLogOut() {
    this.setState({
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      // searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      errorMsg: { value: false, errors: [] },
    });
  }

  handleErrorMsg(error) {
    this.setState({
      errorMsg: error,
    });
  }

  render() {
    // Welcome Page
    const welcomeActive = () => {
      if (this.state.showWelcome) {
        return (
          <Welcome
            onLoginClick={this.handleClickLogin}
            onRegisterClick={this.handleClickRegister}
            onGuestClick={this.handleClickGuest}
          ></Welcome>
        );
      }
    };

    // Register Form
    const registerFormActive = () => {
      if (this.state.showRegisterForm) {
        return (
          <RegisterForm
            onBackClick={this.handleClickBack}
            onLoginClick={this.handleClickLogin}
            onFormError={this.handleErrorMsg}
          ></RegisterForm>
        );
      }
    };

    // Login Form
    const loginFormActive = () => {
      if (this.state.showLoginForm) {
        return (
          <LoginForm
            onBackClick={this.handleClickBack}
            onLoggedIn={this.handleLoggedIn}
            onFormError={this.handleErrorMsg}
          ></LoginForm>
        );
      }
    };

    // Banner
    const bannerActive = () => {
      if (this.state.showBanner) {
        return (
          <Banner
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onProfileTabClick={this.handleClickProfileTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onSearchTextEnter={this.handleSearchTextEnter}
            onLogOutClick={this.handleClickLogOut}
          ></Banner>
        );
      }
    };

    // Error Message
    const errorMsgActive = () => {
      if (this.state.errorMsg.value) {
        return (
          <ErrorMessage errors={this.state.errorMsg.errors}></ErrorMessage>
        );
      }
    };

    return (
      <React.Fragment>
        {welcomeActive()}
        {bannerActive()}
        <div className="main">{errorMsgActive()}</div>
        {loginFormActive()}
        {registerFormActive()}
      </React.Fragment>
    );
  }
}
