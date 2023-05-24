import React, { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import hearthAnimation from "../assets/heart-animation.png";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const PostReaction = ({ id, totalLikes }) => {
  //Checking for likes
  const { user } = useUserContext();
  const [likes, setLikes] = useState(totalLikes);
  const isLikedByUser = likes.includes(user._id);

  //Fetch for likes
  const { error, performFetch, cancelFetch } = useFetch(
    `/post/${id}/like`,
    (response) => {
      setLikes(response.result);
    }
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  const likePost = () => {
    performFetch({
      method: "PUT",
      body: JSON.stringify({
        userId: user._id,
      }),
    });
  };

  return (
    <div className="post-reaction" onClick={likePost}>
      <div
        style={{ backgroundImage: `url(${hearthAnimation})` }}
        className={`heart-icon ${isLikedByUser ? "pink is-animating" : "grey"}`}
      ></div>
      <div className="likes">{likes.length}</div>
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
    </div>
  );
};

PostReaction.propTypes = {
  id: PropTypes.string.isRequired,
  totalLikes: PropTypes.array.isRequired,
};

export default PostReaction;
