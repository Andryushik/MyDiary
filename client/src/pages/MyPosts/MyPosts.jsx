import React from "react";
import Navbar from "../../components/Navbar";
import MyPostsMiddle from "../../components/MyPostsMiddle";
import MyPostsRight from "../../components/MyPostsRight";
import "./MyPosts.css";

const MyPosts = () => {
  return (
    <div className="page-container">
      {/* active must be same with navbar name of the page */}
      <Navbar active={"My Diary"} />
      <MyPostsMiddle />
      <MyPostsRight />
    </div>
  );
};

export default MyPosts;
