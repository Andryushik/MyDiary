import React from "react";
import Navbar from "../../components/Navbar";
import AnotherUserMiddle from "../../components/AnotherUserMiddle";
import MyPostsRight from "../../components/MyPostsRight";
import "./AnotherUser.css";
const AnotherUser = () => {
  return (
    <div className="page-container">
      {/* active must be same with navbar name of the page */}
      <Navbar active={"Another User"} />
      <AnotherUserMiddle />
      <MyPostsRight />
    </div>
  );
};

export default AnotherUser;
