import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import MostLikedPosts from "./MostLikedPosts";
import { sanitizeTags } from "../util/sanitizeTags";

const SearchMiddle = () => {
  const { most } = useParams(); //comes from tags
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedWord, setSearchedWord] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [newSearch, setNewSearch] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags?q=${searchQuery}&limit=10&page=${currentPage}`,
    (response) => {
      if (currentPage === 1 && response.result === []) setSearchResult([]);
      setSearchResult((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    if (searchResult.length < 10 || currentPage === 1) return;
    performFetch();
    return cancelFetch;
  }, [currentPage]);

  useEffect(() => {
    if (most) {
      setCurrentPage(1);
      setSearchResult([]);
      const sanitizedMost = sanitizeTags(most); // Remove '#' symbol from tags
      setSearchQuery((prevSearchQuery) => {
        // Update the searchQuery based on the previous state
        if (sanitizedMost !== prevSearchQuery) {
          return sanitizedMost;
        }
        return prevSearchQuery;
      });
    }
  }, [most]);

  useEffect(() => {
    if (most === searchQuery) {
      setCurrentPage(1);
      setSearchResult([]);
      performFetch();
    }

    return cancelFetch;
  }, [most, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      setSearchResult([]);
      performFetch();
    }

    return cancelFetch;
  }, [newSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchedWord(searchQuery);
    setSearchResult([]);
    setCurrentPage(1);
    setNewSearch(!newSearch);
    if (!searchQuery) return;
    performFetch();
  };

  // using Intersection Observer for fetching new posts when we see the last post on the page
  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  return (
    <div className="middle-section">
      <div className="middle-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-info">
            <input
              type="text"
              minLength="2"
              required
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="search-input"
            />
            {!isLoading && (searchedWord || most) && !searchResult.length && (
              <p className="found-no-result search-results">
                No results for:
                <strong> {searchedWord || most}</strong>
              </p>
            )}

            {searchResult && searchResult.length > 0 && (
              <p className="search-results">
                {searchResult.length >= 10 ? "many" : searchResult.length}{" "}
                {searchResult.length === 1 ? "result" : "results"}
              </p>
            )}
          </div>

          <button type="submit" className="search-search-button">
            <SearchIcon className="search-search-icon" />
          </button>
        </form>
      </div>
      {error && typeof error === "string" ? (
        <div className="error">error</div>
      ) : (
        ""
      )}
      {/* Posts */}
      <div className="middle-container-results">
        {isLoading && (
          <div className="load-container">
            <Loading />
          </div>
        )}
        {searchResult.length ? (
          searchResult.map((mappedPost, i) => (
            <div
              className="single-post has-loading"
              ref={searchResult.length === i + 1 ? lastPostRef : null}
              key={mappedPost._id}
            >
              <SinglePost mappedPost={mappedPost} />
            </div>
          ))
        ) : (
          <MostLikedPosts />
        )}
      </div>
    </div>
  );
};

export default SearchMiddle;
