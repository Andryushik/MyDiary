import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import React from "react";

//Creating a user context to hold user information
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
};

//Providing basic functions to control user
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: null });

  // check if the user is logged in
  // if so, update the auth context
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      dispatch({ type: "LOGIN", payload: auth });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// This required for Eslint, without this: { children } make a problem.
AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
