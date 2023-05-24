import React from "react";
import FriendsList from "./FriendsList";
import TrendingTags from "./TrendingTags";

const SearchRight = () => {
  return (
    <div className="right-section">
      <div className="double-container">
        <div className="top-div">
          <div className="tags-inside">
            <TrendingTags />
          </div>
        </div>
        <div className="middle-div">
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default SearchRight;
