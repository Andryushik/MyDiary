import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const NavbarLinks = ({ link, svg, text, active }) => {
  // if active(string coming from page) and the text(Navbar name of link) are same that link will be active
  return (
    <li className={active === text ? "active" : ""}>
      <Link className="link-group" to={link}>
        <div className="link-svg">{svg}</div>
        <div className="link-text">{text}</div>
      </Link>
    </li>
  );
};

// This required for Eslint, without this: { props } make a problem.
NavbarLinks.propTypes = {
  link: PropTypes.string.isRequired,
  svg: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.string,
};

export default NavbarLinks;
