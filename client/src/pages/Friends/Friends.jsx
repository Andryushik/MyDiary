import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import FriendsMiddle from "../../components/FriendsMiddle";
import FriendsRight from "../../components/FriendsRight";
import "./Friends.css";

const Friends = () => {
  const [searchData, setSearchData] = useState({});

  return (
    <div className="page-container">
      <Navbar active={"Friends"} />
      <FriendsMiddle
        searchData={searchData}
        onSearchDataChange={(newSearchData) => {
          setSearchData(newSearchData);
        }}
      />
      <FriendsRight
        onSearchDataChange={(newSearchData) => {
          setSearchData(newSearchData);
        }}
      />
    </div>
  );
};

export default Friends;
