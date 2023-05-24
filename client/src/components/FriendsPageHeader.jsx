import React, { useRef } from "react";

import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

const FriendsPageHeader = ({ friendCount }) => {
  const inputRef = useRef(null); // create a ref to the input element

  const handleSearch = (event) => {
    event.preventDefault();
    const searchText = inputRef.current.value.trim(); //take value from input to search on page
    if (searchText) {
      window.find(searchText);
    }
  };

  return (
    <div className="friends-page-header">
      <div>
        <h2>Friends</h2>
        <h4>
          <strong>{friendCount}</strong> Friends
        </h4>
      </div>
      <div className="right">
        {/* Search Bar */}
        <form className="friends-search-form">
          <input
            type="text"
            placeholder="Find friends"
            className="friends-search-input"
            ref={inputRef}
          />
          <button
            type="submit"
            className="friends-search-button"
            onClick={handleSearch}
          >
            <SearchIcon className="friends-search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

FriendsPageHeader.propTypes = {
  friendCount: PropTypes.number,
};

export default FriendsPageHeader;
