import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { usePostsContext } from "../hooks/usePostsContext";
import { useUserContext } from "../hooks/useUserContext";
import SinglePost from "./SinglePost";
import Loading from "./Loading";

const ModerationPosts = ({ status }) => {
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/moderation/${status}/${user._id}?limit=10&page=${currentPage}`,
    (response) => {
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
  }, [status]);

  useEffect(() => {
    if (currentPage !== 1) return;
    performFetch();
    return cancelFetch;
  }, [status, currentPage]);

  useEffect(() => {
    if (posts.length < 10 || currentPage === 1) return;
    performFetch();
    return cancelFetch;
  }, [currentPage]);

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

  // NO filter posts so Moderator will se sign but post disappear from feed only after fetching
  // or filter if we want banned post disappears at the same moment as ban pushed
  const filteredPosts = posts.filter((post) => {
    return status === "reported"
      ? post.isReported && !post.isBanned
      : post.isBanned;
  });

  return (
    <>
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {filteredPosts === [] ? (
          <div className="no-banned-posts">No any posts yet</div>
        ) : (
          filteredPosts.map((mappedPost, i) => (
            <div
              className="single-post has-loading"
              ref={filteredPosts.length === i + 1 ? lastPostRef : null}
              key={mappedPost._id}
            >
              <SinglePost mappedPost={mappedPost} />
            </div>
          ))
        )}
      </div>

      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
    </>
  );
};

ModerationPosts.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ModerationPosts;
