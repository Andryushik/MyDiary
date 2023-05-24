import React from "react";
import Navbar from "../../components/Navbar";
import SearchMiddle from "../../components/SearchMiddle";
import SearchRight from "../../components/SearchRight";
import "./Search.css";

const Search = () => {
  return (
    <div className="page-container">
      <Navbar active={"Search"} />
      <SearchMiddle />
      <SearchRight />
    </div>
  );
};

export default Search;
