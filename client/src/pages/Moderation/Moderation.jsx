import React from "react";
import Navbar from "../../components/Navbar";
import ModerationMiddle from "../../components/ModerationMiddle";
import MyPostsRight from "../../components/MyPostsRight";
import "./Moderation.css";

const Moderation = () => {
  return (
    <div className="page-container">
      <Navbar active={"Moderation"} />
      <ModerationMiddle />
      <MyPostsRight />
    </div>
  );
};

export default Moderation;
