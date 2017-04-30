import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} type="button" className={className}>
    {children}
  </button>
);

Button.defaultProps = {
  className: ""
};

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { Button };
