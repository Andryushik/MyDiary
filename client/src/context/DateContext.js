import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DateContext = createContext(null);

export const DatesProvider = ({ children }) => {
  const [date, setDate] = useState(null);

  // This will be provided
  const contextValue = {
    date,
    setDate,
  };

  // We will provide from Index.jsx, otherwise can't call date in MyPostsMiddle.jsx
  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};
// This required for Eslint, without this: { children } make a problem.
DatesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DatesProvider;
