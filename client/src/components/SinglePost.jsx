import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import "./SinglePost.css";

import useGetAnotherUser from "../hooks/useGetAnotherUser";
import ProfilePicture from "./ProfilePicture";
import PostReaction from "./PostReaction";
import PostDate from "./PostDate";
import DropdownMenu from "./DropdownMenu";
import DeletePost from "./DeletePost";
import BanPost from "./BanPost";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Loading from "./Loading";
import PopUp from "./PopUp";
import ReportPost from "./ReportPost";
import noImage from "../assets/no-image.png";

//Use this for mapped post or single post. Sending post alone is enough. It takes required info from the post itself and make required fetch operations.
const SinglePost = ({ mappedPost }) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const { user } = useUserContext();
  const { isLoading, error, anotherUser } = useGetAnotherUser({
    anotherUserId: mappedPost.userId,
  });

  //Limit text inside result in 200 symbols. Otherwise ...Show more
  const MAX_CONTENT_LENGTH = 200;
  const MAX_CONTENT_LINES = 4;
  const [showMore, setShowMore] = useState(false);
  const numLines = mappedPost.content.split("\n").length;
  const content = showMore
    ? mappedPost.content
    : mappedPost.content
        .split("\n")
        .slice(0, MAX_CONTENT_LINES)
        .join("\n")
        .slice(0, MAX_CONTENT_LENGTH);

  const handleShowMore = (event) => {
    event.preventDefault();
    setShowMore(!showMore);
  };

  //Link to profile
  const profileLink =
    anotherUser?._id === user._id ? "/my-posts" : `/user/${anotherUser?._id}`;

  // Pop-up controller
  const openPopup = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the document
    setPopUpOpen(true);
  };

  return (
    <div className="single-post-component">
      <div className="post-container">
        {/* Profile Picture */}
        <div className="side-profile has-loading">
          <Link to={profileLink}>
            {isLoading && <Loading />}
            <ProfilePicture
              profilePicture={anotherUser ? anotherUser.profilePicture : null}
              size={"small"}
            />
          </Link>
        </div>

        {/* Post */}
        <div className="post-content">
          <div className="post-header">
            <Link to={profileLink}>
              <h3 className="profile-name">
                {anotherUser ? anotherUser.firstName : null}
              </h3>
            </Link>
            <div className="post-right-side">
              {/* Date */}
              <PostDate date={mappedPost.createdAt} />
              <DropdownMenu>
                <summary role="button">
                  <a className="dropdownButton">...</a>
                </summary>
                <ul>
                  <DeletePost
                    postId={mappedPost._id}
                    anotherUserId={anotherUser?._id}
                  />
                  <ReportPost post={mappedPost} />
                  <BanPost post={mappedPost} />
                </ul>
              </DropdownMenu>
            </div>
          </div>
          {/* Post Content */}{" "}
          <div className="post-content-contents">
            <div className="post-content-text">
              {content}
              {(mappedPost.content.length > MAX_CONTENT_LENGTH ||
                numLines > MAX_CONTENT_LINES) && (
                <span>
                  {showMore ? " " : "... "}
                  <a href="#" className="show-link" onClick={handleShowMore}>
                    {showMore ? " Show less" : "Show more"}
                  </a>
                </span>
              )}
            </div>
            {mappedPost.image && (
              <>
                <PopUp isOpen={isPopUpOpen} setPopUpOpen={setPopUpOpen}>
                  <div className="popUp-Image-container">
                    <img
                      src={mappedPost.image}
                      alt="post image"
                      onError={(e) => (e.target.src = noImage)}
                    ></img>
                  </div>
                </PopUp>
                <div className="post-image">
                  <img
                    onClick={openPopup}
                    src={mappedPost.image}
                    alt="post image"
                    onError={(e) => (e.target.src = noImage)}
                  ></img>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Post Bottom */}
      <div className="post-bottom">
        <p className="post-bottom-tags">
          {mappedPost.tags.map((tag) => (
            <span key={tag}>#{tag.toUpperCase()}&nbsp;</span>
          ))}
        </p>
        {mappedPost.isBanned ? (
          <RemoveCircleIcon sx={{ color: "red", fontSize: 30 }} />
        ) : mappedPost.isPrivate ? (
          <LockPersonIcon sx={{ color: "gray", fontSize: 30 }} />
        ) : (
          <PostReaction id={mappedPost._id} totalLikes={mappedPost.likes} />
        )}
      </div>
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

SinglePost.propTypes = {
  mappedPost: PropTypes.object.isRequired,
};

export default SinglePost;
