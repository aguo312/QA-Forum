import React from "react";
import axios from "axios";
// import TagsTableRow from "./TagsTableRow";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class TagsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <div>Tags Table</div>
      </React.Fragment>
    );
  }
}
