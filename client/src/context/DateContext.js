import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

//Creating a date context to use dates filters
export const DateContext = createContext(null);

export const DatesProvider = ({ children }) => {
  const [date, setDate] = useState(null);

  const contextValue = {
    date,
    setDate,
  };

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

DatesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DatesProvider;
