import React from "react";
import axios from "axios";
import Welcome from "./Welcome";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Banner from "./Banner";
import DataTable from "./DataTable";
import TagsTable from "./TagsTable";
import Profile from "./Profile";
import QuestionForm from "./QuestionForm";
import AnswerForm from "./AnswerForm";
import EditForm from "./EditForm";
import ErrorMessage from "./ErrorMessage";
import QuestionTable from "./QuestionTable";

axios.defaults.withCredentials = true;

export default class QAForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionInfo: { value: false, qid: "" },
      searchText: { value: false, tagsOnly: false, search: "" },
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: false,
      errorMsg: { value: false, errors: [] },
      user: {},
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickGuest = this.handleClickGuest.bind(this);
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickProfileTab = this.handleClickProfileTab.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickQuestionInfo = this.handleClickQuestionInfo.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/userdata").then((res) => {
      if (res.data.loggedUser && !res.data.guest) {
        this.setState({
          showWelcome: false,
          showBanner: true,
          showQuestionsTab: true,
          user: res.data.loggedUser,
        });
      }
    });
  }

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
      showQuestionsTab: true,
      showTagsTab: false,
      showProfileTab: false,
    });
    console.log("guest");
  }

  handleClickQuestionsTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: true,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showQuestionInfo: { value: false },
      searchText: { value: false, tagsOnly: false, search: "" },
    });
  }

  handleClickTagsTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: true,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showQuestionInfo: { value: false },
    });
  }

  handleClickProfileTab() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: true,
      showQuestionForm: false,
      showAnswerForm: false,
      showQuestionInfo: { value: false },
    });
  }

  handleClickAskQuestion() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: true,
      showAnswerForm: false,
      showQuestionInfo: { value: false },
    });
  }

  handleClickAnswerQuestion() {
    this.setState({
      showBanner: true,
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showAnswerForm: true,
      showQuestionInfo: { value: false, qid: this.state.showQuestionInfo.qid },
    });
  }

  handleClickSearchByTag(search) {
    this.setState({
      showBanner: true,
      showQuestionsTab: true,
      showTagsTab: false,
      searchText: { value: true, tagsOnly: true, search: search },
    });
  }

  handleSearchTextEnter(search) {
    this.setState({
      showBanner: true,
      searchText: { value: true, tagsOnly: false, search: search },
      showQuestionsTab: true,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showQuestionInfo: { value: false },
    });
  }

  handleClickQuestionInfo(qid) {
    this.setState({
      showQuestionsTab: false,
      showQuestionInfo: { value: true, qid: qid },
      showAnswerForm: false,
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
      searchText: { value: false },
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
            tabs={[
              this.state.showQuestionsTab,
              this.state.showTagsTab,
              this.state.showProfileTab,
            ]}
            searchText={this.state.searchText}
          ></Banner>
        );
      }
    };

    // Data Table
    const questionsActive = () => {
      if (this.state.showQuestionsTab) {
        return (
          <DataTable
            onAskQuestionClick={this.handleClickAskQuestion}
            onQuestionInfoClick={this.handleClickQuestionInfo}
            searchText={this.state.searchText}
          ></DataTable>
        );
      }
    };

    const tagsActive = () => {
      if (this.state.showTagsTab) {
        return (
          <TagsTable
            onAskQuestionClick={this.handleClickAskQuestion}
            onSearchByTagClick={this.handleClickSearchByTag}
          ></TagsTable>
        );
      }
    };

    const profileActive = () => {
      if (this.state.showProfileTab) {
        return <Profile uid={this.state.user._id}></Profile>;
      }
    };

    // Question Info
    const questionInfoActive = () => {
      if (this.state.showQuestionInfo.value) {
        return (
          <QuestionTable
            qid={this.state.showQuestionInfo.qid}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onFormError={this.handleErrorMsg}
          ></QuestionTable>
        );
      }
    };

    // Question Form
    const questionFormActive = () => {
      if (this.state.showQuestionForm) {
        return (
          <QuestionForm
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onFormError={this.handleErrorMsg}
          ></QuestionForm>
        );
      }
    };

    // Answer Form
    const answerFormActive = () => {
      if (this.state.showAnswerForm) {
        return (
          <AnswerForm
            qid={this.state.showQuestionInfo.qid}
            onQuestionInfoClick={this.handleClickQuestionInfo}
            onFormError={this.handleErrorMsg}
          ></AnswerForm>
        );
      }
    };

    // Edit Form
    const editFormActive = () => {
      if (this.state.showEditForm) {
        return <EditForm></EditForm>;
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
        <div className="main">
          {errorMsgActive()}
          {questionsActive()}
          {tagsActive()}
          {profileActive()}
          {questionInfoActive()}
        </div>
        {loginFormActive()}
        {registerFormActive()}
        {questionFormActive()}
        {answerFormActive()}
        {editFormActive()}
      </React.Fragment>
    );
  }
}
