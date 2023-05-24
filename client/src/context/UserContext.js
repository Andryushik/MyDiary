import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

//Creating a user context to hold user information
export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "FOLLOWINGS":
      return {
        ...state,
        user: {
          ...state.user,
          following: action.payload.following,
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

//Providing basic functions to control user
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
