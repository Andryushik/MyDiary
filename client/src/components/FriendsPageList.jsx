import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfilePicture from "./ProfilePicture";
import DropdownMenu from "./DropdownMenu";
import FollowUnfollowButton from "./FollowUnfollowButton";

const SingleFriend = ({ mappedFriend, refreshUser }) => {
  return (
    <div className="friends-page-item-container">
      <Link
        key={mappedFriend._id}
        to={`/user/${mappedFriend._id}`}
        className="friends-page-item"
      >
        <div>
          <ProfilePicture profilePicture={mappedFriend.profilePicture} />
        </div>
        <div className="friend-details">
          <div className="friend-name">
            <h3>
              {mappedFriend.firstName} {mappedFriend.lastName}
            </h3>
          </div>
          <div className="friend-bio">
            <span>{mappedFriend.bio}</span>
          </div>
        </div>
      </Link>
      <DropdownMenu>
        <summary role="button">
          <a className="dropdownButton">...</a>
        </summary>
        <ul>
          <li>
            <FollowUnfollowButton
              anotherUserId={mappedFriend._id}
              refreshUser={refreshUser}
            />
          </li>
        </ul>
      </DropdownMenu>
    </div>
  );
};

SingleFriend.propTypes = {
  mappedFriend: PropTypes.object,
  refreshUser: PropTypes.func,
};

const FriendsPageList = ({ friends, refreshUser }) => {
  return (
    <div className="friends-page">
      {friends &&
        friends.map((mappedFriend) => (
          <SingleFriend
            key={mappedFriend._id}
            mappedFriend={mappedFriend}
            refreshUser={refreshUser}
          />
        ))}
    </div>
  );
};

FriendsPageList.propTypes = {
  friends: PropTypes.array.isRequired,
  refreshUser: PropTypes.func,
};

export default FriendsPageList;
