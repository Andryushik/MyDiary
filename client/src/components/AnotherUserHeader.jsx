import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import FollowUnfollowButton from "./FollowUnfollowButton";
import ProfilePicture from "./ProfilePicture";
import useGetAnotherUser from "../hooks/useGetAnotherUser";

const AnotherUserHeader = ({ id }) => {
  const {
    isLoading: anotherUserLoading,
    error: anotherUserError,
    anotherUser,
    reset: resetAnotherUser, // add reset function here
  } = useGetAnotherUser({
    anotherUserId: id,
  });

  useEffect(() => {
    resetAnotherUser();
  }, [id]);

  return (
    <div className="middle-container">
      {/* Page Header */}
      <div className="page-header has-loading">
        {anotherUserLoading && <Loading />}

        <div className="left">
          <h2>{anotherUser && anotherUser.firstName}</h2>
          <h2>{anotherUser && anotherUser.lastName}</h2>
          <br />
          <h4>
            {anotherUser && anotherUser.country}
            {/* we cannot use the posts with scroll if we not make a separate request */}
            {/*<strong>{filteredPosts && filteredPosts.length}</strong>{" "} */}
            {/* {filteredPosts.length > 1 ? "posts" : "post"} */}
          </h4>
          <button>
            <FollowUnfollowButton anotherUserId={id} />
          </button>
        </div>
        <div className="another-profile">
          <ProfilePicture
            profilePicture={anotherUser && anotherUser.profilePicture}
            size={"large"}
          />
        </div>
        <div className="right">
          <h3>{`"${anotherUser && anotherUser.bio}"`}</h3>
        </div>
      </div>

      {anotherUserError && (
        <div className="error">
          {anotherUserError.message || anotherUserError}
        </div>
      )}
    </div>
  );
};

AnotherUserHeader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AnotherUserHeader;
