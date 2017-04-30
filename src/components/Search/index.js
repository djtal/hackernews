import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <button type="submit">
      {children} <input type="text" onChange={onChange} value={value} />
    </button>
  </form>
);

Search.PropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  childred: PropTypes.node
};

export { Search };
