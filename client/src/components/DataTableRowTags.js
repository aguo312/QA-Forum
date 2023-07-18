import React from "react";
import PropTypes from "prop-types";

export default class DataTableRowTags extends React.Component {
  render() {
    const tagRows = [];
    for (let i = 0; i < this.props.tags.length; i += 4) {
      tagRows.push(
        <div className="questionTags" key={i}>
          {this.props.tags.slice(i, i + 4).map((tagObj) => {
            return <div key={tagObj._id}>{tagObj.name}</div>;
          })}
        </div>
      );
    }
    return <div>{tagRows}</div>;
  }
}

DataTableRowTags.propTypes = {
  tags: PropTypes.array,
};
