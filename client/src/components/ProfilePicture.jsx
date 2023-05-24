import React from "react";
import noAvatar from "../assets/NoAvatar.png";
import PropTypes from "prop-types";
import "./ProfilePicture.css";

//Size: "":13vw | "medium":8.5vw | "small":6.5vw | "smaller":4.5vw
//Border: "":50% | "square":0px | "rounded":37px
const ProfilePicture = ({ profilePicture, size, border }) => {
  return (
    <div className={`profile-picture-component ${size}`}>
      <img
        className={border}
        src={profilePicture ? profilePicture : noAvatar}
        alt="profile picture"
        onError={(e) => (e.target.src = noAvatar)}
      />
    </div>
  );
};
// This required for Eslint, without this: { props } make a problem.
ProfilePicture.propTypes = {
  profilePicture: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.string,
};

export default ProfilePicture;
