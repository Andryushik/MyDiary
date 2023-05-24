import React from "react";
import PropTypes from "prop-types";
function Loading({ loadMessage }) {
  // !! -Loading- parent div must have has-loader as a class. Other way loader will expand
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
      {loadMessage && (
        <div className="spin-message">
          <p>{loadMessage}</p>
        </div>
      )}
    </div>
  );
}

// This required for Eslint, without this: { props } make a problem.
Loading.propTypes = {
  loadMessage: PropTypes.string,
};
export default Loading;
