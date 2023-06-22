import React from "react";
import axios from "axios";
import Welcome from "./Welcome";
import RegisterForm from "./RegisterForm";

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
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
  }

  componentDidMount() {}

  handleClickLogin() {
    this.setState({
      showWelcome: false,
      showLoginForm: true,
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

    return (
      <React.Fragment>
        {welcomeActive()}
        <div className="main"></div>
        {registerFormActive()}
      </React.Fragment>
    );
  }
}
