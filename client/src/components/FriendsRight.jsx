import React from "react";

import FriendsToFollow from "./FriendsToFollow";
import PropTypes from "prop-types";

const FriendsRight = ({ onSearchDataChange }) => {
  return (
    <div className="right-section">
      <div className="single-container">
        <div>
          <FriendsToFollow onSearchDataChange={onSearchDataChange} />
        </div>
      </div>
    </div>
  );
};

FriendsRight.propTypes = {
  onSearchDataChange: PropTypes.func.isRequired,
};

export default FriendsRight;
