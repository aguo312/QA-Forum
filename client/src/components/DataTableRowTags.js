import React from "react";
import PropTypes from "prop-types";

export default class DataTableRowTags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tagRows = [];
    Array.from(this.props.tags).forEach((tagObj) => {
      console.log(tagObj);
    });
    return <div>Tags</div>;
  }
}
