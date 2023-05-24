import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import SinglePost from "./SinglePost";
import Loading from "./Loading";
import { useDateContext } from "../hooks/useDateContext";

const AnotherUserPosts = ({ id }) => {
  const { posts, setPosts } = usePostsContext();
  const { date } = useDateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${id}?date=${
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
  }, [id, date]);

  useEffect(() => {
    if (currentPage !== 1) return;
    performFetch();
    return cancelFetch;
  }, [id, date, currentPage]);

  useEffect(() => {
    if (posts.length < 10 || currentPage === 1) return;
    performFetch();
    return cancelFetch;
  }, [currentPage]);

  // NO filter posts so Moderator will se sign but post disappear from feed only after fetching
  // or filter if we want banned post disappears at the same moment as ban pushed
  const filteredPosts = posts;
  // .filter((post) => {
  //   return !post.isBanned;
  // });

  // using Intersection Observer for fetching new posts when we see the last post on the page
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((postList) => {
        if (postList[0].isIntersecting && hasNextPage && posts.length > 9) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return (
    <>
      <div>
        {filteredPosts.length > 0
          ? filteredPosts.map((post, i) => (
              <div
                className="single-post has-loading"
                ref={filteredPosts.length === i + 1 ? lastPostRef : null}
                key={post._id}
              >
                <SinglePost mappedPost={post} />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">This user not yet post anything</div>
            )}
      </div>
      {isLoading && (
        <div className="load-container">
          .
          <Loading />
        </div>
      )}
      {error && <div className="error">{error.message || error}</div>}
    </>
  );
};

AnotherUserPosts.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AnotherUserPosts;
