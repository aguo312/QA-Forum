import React from "react";
import PropTypes from "prop-types";

export default class ErrorMessage extends React.Component {
  render() {
    return (
      <div id="errorMessage">
        {this.props.errors.map((e) => (
          <React.Fragment key={e}>
            {e}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.array,
};
