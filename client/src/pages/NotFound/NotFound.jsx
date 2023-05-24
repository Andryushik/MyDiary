import React from "react";
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <SentimentVeryDissatisfiedIcon
          className="sad"
          sx={{ fontSize: "100px" }}
        />
        <h1>Oops! You seem to be lost.</h1>
        <br />
        <h2>
          <b>404</b> Page NOT FOUND!
        </h2>
        <br />
        <br />
        <br />
        <p>Here are some helpful links:</p>
        <br />
        <Link to="/">Home</Link>
        <br />
        <br />
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default NotFound;
