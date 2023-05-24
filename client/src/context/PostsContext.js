import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
