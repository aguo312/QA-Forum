import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClickLogin(e) {
    e.preventDefault();
    console.log("is logging in");
    const emptyEmail = this.state.email.length === 0;
    const emptyPassword = this.state.password.length === 0;
    if (emptyEmail || emptyPassword) {
      const errorMessages = [];
      if (emptyEmail) {
        errorMessages.push("Email is empty!");
      }
      if (emptyPassword) {
        errorMessages.push("Password is empty!");
      }
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      axios
        .get("http://localhost:8000/users/" + this.state.email)
        .then((res) => {
          // console.log(res.data);
          if (!res.data) {
            const errorMessages = [];
            errorMessages.push("Unregistered Email!");
            const error = {
              value: true,
              errors: errorMessages,
            };
            this.props.onFormError(error);
          } else {
            axios
              .post("http://localhost:8000/login", [res, this.state.password])
              .then((res) => {
                if (!res.data) {
                  const errorMessages = [];
                  errorMessages.push("Incorrect Password!");
                  const error = {
                    value: true,
                    errors: errorMessages,
                  };
                  this.props.onFormError(error);
                } else {
                  const error = {
                    value: false,
                    errors: "",
                  };
                  this.props.onFormError(error);
                  this.props.onLoggedIn();
                }
              });
          }
        });
    }
  }

  handleClickBack() {
    this.props.onBackClick();
  }

  render() {
    return (
      <React.Fragment>
        <form id="loginForm">
          <label>
            Email:
            <br />
            <input
              id="logEmail"
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
              id="logPassword"
              type="password"
              onChange={this.handlePasswordChange}
            ></input>
          </label>
          <br />
          <br />
          <button onClick={this.handleClickLogin}>Login</button>
          <button onClick={this.props.onBackClick}>Back</button>
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  onBackClick: PropTypes.func,
  onFormError: PropTypes.func,
  onLoggedIn: PropTypes.func,
};
