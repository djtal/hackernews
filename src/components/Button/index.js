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

const Loading = () => <div>Loading...</div>;

const withLoading = Component => ({ isLoading, ...rest }) =>
  (isLoading ? <Loading /> : <Component {...rest} />);

const ButtonWithLoading = withLoading(Button);

ButtonWithLoading.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { Button, ButtonWithLoading };
