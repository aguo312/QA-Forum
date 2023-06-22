import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      vPassword: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleVPasswordChange = this.handleVPasswordChange.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleVPasswordChange(e) {
    this.setState({ vPassword: e.target.value });
  }

  handleClickRegister(e) {
    e.preventDefault();
    console.log("registering");
    const emptyUser = this.state.username.length === 0;
    const emptyEmail = this.state.email.length === 0;
    const emptyPassword = this.state.password.length === 0;
    const emptyVPassword = this.state.vPassword.length === 0;
    const emailSplit = this.state.email.split("@");
    const emailDomain = (() => {
      if (emailSplit.length === 2) {
        return emailSplit[1];
      }
    })();
    const emailDomainSplit = (() => {
      if (emailDomain) {
        return emailDomain.split(".");
      }
    })();
    const emailDomainSplitSize = (() => {
      if (emailDomainSplit) {
        return emailDomainSplit.every((s) => s.length > 0);
      }
    })();
    const emailDomainSplitEnd = (() => {
      if (emailDomainSplit && emailDomainSplit.length >= 2) {
        return emailDomainSplit[emailDomainSplit.length - 1];
      }
    })();
    const emailDomainSplitEndSize = (() => {
      if (emailDomainSplitEnd) {
        return emailDomainSplitEnd.length >= 2;
      }
    })();
    const invalidPassword =
      this.state.password.includes(this.state.username) ||
      this.state.password.includes(emailSplit[0]);
    const nonMatchPassword = this.state.password !== this.state.vPassword;
    if (
      emptyUser ||
      emptyEmail ||
      emptyPassword ||
      emptyVPassword ||
      emailSplit.length !== 2 ||
      !emailDomainSplitSize ||
      !emailDomainSplitEnd ||
      !emailDomainSplitEndSize ||
      invalidPassword ||
      nonMatchPassword
    ) {
      const errorMessages = [];
      if (emptyUser) {
        errorMessages.push("Username is empty!");
      }
      if (emptyEmail) {
        errorMessages.push("Email is empty!");
      } else if (
        emailSplit.length !== 2 ||
        !emailDomainSplitSize ||
        !emailDomainSplitEnd ||
        !emailDomainSplitEndSize
      ) {
        errorMessages.push("Email is invalid!");
      }
      if (emptyPassword) {
        errorMessages.push("Password is empty!");
      } else if (invalidPassword) {
        errorMessages.push("Password contains the username or email id!");
      }
      if (emptyVPassword) {
        errorMessages.push("Verify Password is empty!");
      }
      if (nonMatchPassword) {
        errorMessages.push("Passwords are not matching!");
      }
      const error = {
        value: true,
        errors: errorMessages,
      };
      //   this.props.onFormError(error);
    } else {
      console.log("pass");
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="registerForm">
          <label>
            Username:
            <br />
            <input
              id="regUser"
              type="text"
              onChange={this.handleUsernameChange}
            ></input>
          </label>
          <br />
          <br />
          <label>
            Email:
            <br />
            <input
              id="regEmail"
              type="text"
              onChange={this.handleEmailChange}
            ></input>
          </label>
          <br />
          <br />
          <label>
            Password:
            <br />
            <input
              id="regPassword"
              type="password"
              onChange={this.handlePasswordChange}
            ></input>
          </label>
          <br />
          <br />
          <label>
            Verify Password:
            <br />
            <input
              id="regVPassword"
              type="password"
              onChange={this.handleVPasswordChange}
            ></input>
          </label>
          <br />
          <br />
          <button onClick={this.handleClickRegister}>Register</button>
          <button onClick={this.props.onBackClick}>Back</button>
        </form>
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  onBackClick: PropTypes.func,
  onFormError: PropTypes.func,
  onLoginClick: PropTypes.func,
};
