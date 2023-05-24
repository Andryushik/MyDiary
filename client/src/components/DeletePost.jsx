import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PopUp from "./PopUp";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import { usePostsContext } from "../hooks/usePostsContext";

const DeletePost = ({ postId, anotherUserId }) => {
  const { user } = useUserContext();
  const { posts, setPosts } = usePostsContext();
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${postId}`,
    (response) => {
      if (response.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        setPopUpOpen(false);
      }
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const openPopup = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    setPopUpOpen(true);
  };

  const deleteSelected = (e) => {
    e.preventDefault();
    performFetch({
      method: "DELETE",
    });
  };

  if (anotherUserId !== user._id) return null;

  return (
    <>
      <PopUp isOpen={isPopUpOpen} setPopUpOpen={setPopUpOpen}>
        <>
          <h5 className="pop-up-message">Sure to delete?</h5>
          <button className="pop-up-button" onClick={deleteSelected}>
            Confirm
          </button>
        </>
      </PopUp>
      <li className="has-loading">
        <a onClick={openPopup}>
          {error && (
            <div className="error">
              {typeof error === "string"
                ? error
                : "Error happened. Refresh the page"}
            </div>
          )}
          Delete
        </a>
        {isLoading && <Loading />}
      </li>
    </>
  );
};

DeletePost.propTypes = {
  postId: PropTypes.string,
  anotherUserId: PropTypes.string,
};

export default DeletePost;
