import React from "react";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";
import ProfilePicture from "./ProfilePicture";
import useLogout from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";

const Navbar = ({ active }) => {
  // Getting user information and logout function from context
  const { user } = useUserContext();
  const logout = useLogout();
  const logoutUser = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-top">
        <div className="user-status">
          <div className="user-online">{icons.online}</div>
          <div className="user-information">
            <h3>{user ? user.firstName : ""}</h3>
            <span className="moderator">
              {user?.isModerator ? "(moderator)" : ""}
            </span>
          </div>
        </div>
        <ProfilePicture profilePicture={user ? user.profilePicture : ""} />
      </div>

      <ul className="nav-links nav-middle">
        <NavbarLinks
          link={"/my-posts"}
          text={"My Diary"}
          svg={icons.home}
          active={active}
        />
        <NavbarLinks
          link={"/friends"}
          text={"Friends"}
          svg={icons.friends}
          active={active}
        />
        <NavbarLinks
          link={"/feeds"}
          text={"Feeds"}
          svg={icons.feed}
          active={active}
        />
        <NavbarLinks
          link={"/search"}
          text={"Search"}
          svg={icons.search}
          active={active}
        />
        <NavbarLinks
          link={"/settings"}
          text={"Settings"}
          svg={icons.settings}
          active={active}
        />
        {user?.isModerator && (
          <NavbarLinks
            link={"/moderation"}
            text={"Moderation"}
            svg={icons.moderator}
            active={active}
          />
        )}
      </ul>
      <div className="nav-bottom">
        <hr />
        <div className="logout " onClick={logoutUser}>
          <NavbarLinks link={""} text={"Logout"} svg={icons.logout} />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Navbar;
