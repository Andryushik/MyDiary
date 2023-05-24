import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPosts from "./pages/MyPosts/MyPosts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Friends from "./pages/Friends/Friends";
import Feeds from "./pages/Feeds/Feeds";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";
import Moderation from "./pages/Moderation/Moderation";
import AnotherUser from "./pages/AnotherUser/AnotherUser";
import NotFound from "./pages/NotFound/NotFound";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { auth } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/my-posts"
          element={auth ? <MyPosts /> : <Navigate to="/login" />}
        />
        <Route
          path="/friends"
          element={auth ? <Friends /> : <Navigate to="/login" />}
        />
        <Route
          path="/feeds"
          element={auth ? <Feeds /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={auth ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/search/tags/:most"
          element={auth ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={auth ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/moderation"
          element={auth ? <Moderation /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:id"
          element={auth ? <AnotherUser /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
