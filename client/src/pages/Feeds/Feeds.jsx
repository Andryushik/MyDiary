import React from "react";
import Navbar from "../../components/Navbar";
import FeedsMiddle from "../../components/FeedsMiddle";
import MyPostsRight from "../../components/MyPostsRight";
import "./Feeds.css";
const Feeds = () => {
  return (
    <div className="page-container">
      <Navbar active={"Feeds"} />
      <FeedsMiddle />
      <MyPostsRight />
    </div>
  );
};

export default Feeds;
