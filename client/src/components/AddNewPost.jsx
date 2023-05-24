import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "./AddNewPost.css";
import Loading from "./Loading.jsx";
import AddNewPostImage from "./AddNewPostImage.jsx";
import noImage from "../assets/no-image.png";
import { sanitizeTagsAddNewPost } from "../util/sanitizeTags.js";

const AddNewPost = ({ setActive, handlePostsRefresh }) => {
  const { auth } = useAuthContext();
  const userId = auth.id;
  const [imgLoading, setImgLoading] = useState(false);

  // Todays date
  const newDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = newDate.toLocaleDateString("en-US", options);

  // Inputs
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  //Control expand of text area
  function expandTextarea() {
    const textarea = document.getElementById("new-post-content");
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set height to content height
  }

  //Control Private-public post
  const handleTabClick = (tab) => {
    setIsPrivate(tab);
  };

  //When Post submitted successfully
  const onSuccess = () => {
    setContent("");
    setTags("");
    setIsPrivate(false);
    setImageUrl(null);
    setActive(false);
    handlePostsRefresh();
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/post/create",
    (response) => {
      if (response.success) {
        onSuccess();
      }
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedTags = sanitizeTagsAddNewPost(tags); // Remove '#' symbol from tags

    const post = {
      content,
      image: imageUrl,
      isPrivate,
      tags: sanitizedTags,
      userId,
    };

    performFetch({
      method: "POST",
      body: JSON.stringify({ post }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-post has-loading">
        <div className="new-post-top">
          <h3>- {formattedDate} -</h3>
          <button
            type="button"
            className="post-exit"
            onClick={() => setActive(false)}
          >
            ✖
          </button>
        </div>

        <textarea
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          required
          minLength="3"
          maxLength="10000"
          className="new-post-content"
          id="new-post-content"
          placeholder="My Dear Diary,"
          onInput={expandTextarea}
        />

        <div className="new-post-tags">
          <h3>Tags</h3>
          <input
            type="text"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
            required
            minLength="2"
            className="new-post-tag-input"
            placeholder="#School #Spring"
          />
        </div>

        {imageUrl && (
          <div className="add-post-image">
            <img
              src={imageUrl}
              alt="post image"
              onError={(e) => (e.target.src = noImage)}
            ></img>
          </div>
        )}

        <div className="new-post-bottom">
          <div className="new-post-bottom-left">
            <h3
              className={isPrivate ? "" : "active-posts"}
              onClick={() => handleTabClick(false)}
            >
              Public
            </h3>
            <h3
              className={isPrivate ? "active-posts private" : "private"}
              onClick={() => handleTabClick(true)}
            >
              Private
            </h3>
          </div>
          <div className="new-post-bottom-right">
            <AddNewPostImage
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              setImgLoading={setImgLoading}
              userId={userId}
            />
            <button
              type="submit"
              className="post-publish-button"
              disabled={imgLoading}
            >
              {imgLoading ? "..." : "Publish"}
            </button>
          </div>
        </div>
        {error && (
          <div className="error">
            {typeof error === "string"
              ? error
              : "Error happened. Refresh the page"}
          </div>
        )}
        {isLoading && <Loading />}
      </div>
    </form>
  );
};

AddNewPost.propTypes = {
  setActive: PropTypes.func.isRequired,
  handlePostsRefresh: PropTypes.func.isRequired,
};

export default AddNewPost;
