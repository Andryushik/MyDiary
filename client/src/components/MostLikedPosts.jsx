import React, { useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";
import { usePostsContext } from "../hooks/usePostsContext";

const MostLikedPosts = () => {
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/feed/${user._id}?limit=10&page=1&sort=likes`,
    (response) => {
      setPosts(response.result);
    }
  );

  useEffect(() => {
    setPosts([]);
    performFetch();
    return cancelFetch;
  }, []);

  return (
    <>
      <h3 className="most-liked">
        Take a look on our most trending posts or try another search
      </h3>
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      <div>
        {posts.length > 0
          ? posts.map((post) => (
              <div className="single-post has-loading" key={post._id}>
                <SinglePost mappedPost={post} />
              </div>
            ))
          : !isLoading && (
              <div className="no-post">No post to show in your feed</div>
            )}
      </div>
    </>
  );
};

export default MostLikedPosts;
