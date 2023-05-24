import React from "react";
import EntryCalendar from "./EntryCalendar";
import FriendsList from "./FriendsList";
import TrendingTags from "./TrendingTags";

const MyPostsRight = () => {
  return (
    <div className="right-section">
      <div className="triple-container">
        <div className="top-div has-loading">{<EntryCalendar />}</div>
        <div className="middle-div">
          <FriendsList />
        </div>
        <div className="bottom-div has-loading">
          <div className="tags-inside">
            <TrendingTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostsRight;
