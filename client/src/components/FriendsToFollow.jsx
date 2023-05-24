import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import PropTypes from "prop-types";

const FriendsToFollow = ({ onSearchDataChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  const query = `/search/users?firstName=${firstName}&lastName=${lastName}&birthday=${birthday}&country=${country}&email=${email}`;
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    query,
    (data) => {
      onSearchDataChange(data.result);
    }
  );

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (firstName || lastName || birthday || country || email) {
      performFetch();
    }
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  return (
    <div className="form-container has-loading">
      <h3>+ Friends to follow</h3>
      <form onSubmit={handleSubmitSearch}>
        <div className="input-container">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            className="friends-input"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="John"
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Surname</label>
          <input
            type="text"
            className="friends-input"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Doe"
          />
        </div>
        <div className="input-container">
          <label htmlFor="birthday">Date of birth</label>
          <input
            type="date"
            className="friends-input"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={(e) => {
              const value = e.target.value;
              setBirthday(
                value ? new Date(value).toISOString().slice(0, 10) : ""
              );
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="friends-input"
            id="country"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="Netherlands"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="friends-input"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="example@mail.com"
          />
        </div>
        <div className="friends-right-b">
          <button type="submit" className="friends-button">
            Search
          </button>
        </div>
      </form>
      <br />
      {isLoading && <Loading />}
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

FriendsToFollow.propTypes = {
  onSearchDataChange: PropTypes.func.isRequired,
};

export default FriendsToFollow;
