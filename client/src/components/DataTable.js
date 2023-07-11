import React from "react";
import axios from "axios";
// import DataTableRow from "./DataTableRow";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <div>Data Table</div>
      </React.Fragment>
    );
  }
}
