import React, { useState, useEffect, useRef, useCallback } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../hooks/useUserContext";
import { usePostsContext } from "../hooks/usePostsContext";
import { sanitizeTags } from "../util/sanitizeTags";
import { useDateContext } from "../hooks/useDateContext";
import CalendarSmall from "./CalendarSmall";

const FeedsMiddle = () => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const { date } = useDateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/feed/${user._id}?date=${
      date ? date : ""
    }&limit=10&page=${currentPage}`,
    (response) => {
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
  }, [date]);

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [currentPage, date]);

  useEffect(() => {
    setPosts([]);
    return cancelFetch;
  }, []);

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

  //Handle Search
  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitizedTags = sanitizeTags(searchQuery);
    sanitizedTags
      ? navigate(`/search/tags/${sanitizedTags}`)
      : navigate("/search");
  };

  // NO filter posts so Moderator will se sign but post disappear from feed only after fetching
  // or filter if we want banned post disappears at the same moment as ban pushed
  const filteredPosts = posts;
  // .filter((post) => {
  //   return !post.isBanned;
  // });

  return (
    <div className="middle-section">
      <div className="middle-container ">
        {/* Page Header */}
        <div className="feed-header">
          <div className="left">
            <h2>Feed</h2>
            <CalendarSmall />
          </div>

          <div className="right">
            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="feed-search-form">
              <input
                type="text"
                placeholder="Search posts"
                minLength={2}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="feed-search-input"
              />
              <button type="submit" className="feed-search-button">
                <SearchIcon className="feed-search-icon" />
              </button>
            </form>
          </div>
        </div>
        {error && typeof error === "string" ? (
          <div className="error">error</div>
        ) : (
          ""
        )}
      </div>
      {/* Posts */}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {filteredPosts.length > 0
          ? filteredPosts.map((mappedPost, i) => (
              <div
                className="single-post has-loading"
                ref={filteredPosts.length === i + 1 ? lastPostRef : null}
                key={mappedPost._id}
              >
                <SinglePost mappedPost={mappedPost} />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">No post to show in your feed</div>
            )}
      </div>
    </div>
  );
};

export default FeedsMiddle;
