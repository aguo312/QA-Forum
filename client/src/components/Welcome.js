import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickGuest = this.handleClickGuest.bind(this);
  }

  handleClickLogin() {
    this.props.onLoginClick();
  }

  handleClickRegister() {
    this.props.onRegisterClick();
  }

  handleClickGuest() {
    this.props.onGuestClick();
  }

  render() {
    return (
      <React.Fragment>
        <div id="welcomeText">
          Welcome to
          <br />
          Q&A Forum
        </div>
        <br />
        <button className="welcomeButton" onClick={this.handleClickLogin}>
          Login
        </button>
        <button className="welcomeButton" onClick={this.handleClickRegister}>
          Register
        </button>
        <br />
        <button className="welcomeButton" onClick={this.handleClickGuest}>
          Continue as Guest
        </button>
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  onGuestClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
};
