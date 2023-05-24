import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import DatesProvider from "./context/DateContext";
import AppWrapper from "./AppWrapper";
import "./index.css";
import App from "./App";
import { PostsContextProvider } from "./context/PostsContext";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <UserContextProvider>
        <PostsContextProvider>
          <DatesProvider>
            <App />
          </DatesProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
