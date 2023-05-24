import React from "react";
import PropTypes from "prop-types";

//Making mongoDB date to April 5
const PostDate = ({ date }) => {
  //Date
  const newDate = new Date(date);
  const options = { month: "long", day: "numeric" };
  const formattedDate = newDate.toLocaleDateString("en-US", options);

  return (
    <div className="post-date">
      <h3>{formattedDate}</h3>
    </div>
  );
};

PostDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PostDate;
