import React from "react";
import PropTypes from "prop-types";
import "./DropdownMenu.css";

const DropdownMenu = ({ children }) => {
  return <details className="dropdown">{children}</details>;
};

DropdownMenu.propTypes = {
  children: PropTypes.array,
};

export default DropdownMenu;
