import React from "react";
import { useParams } from "react-router-dom";
import AnotherUserHeader from "./AnotherUserHeader";
import AnotherUserPosts from "./AnotherUserPosts";

const AnotherUserMiddle = () => {
  const { id } = useParams();

  return (
    <div className="middle-section">
      <AnotherUserHeader id={id} />
      <AnotherUserPosts id={id} />
    </div>
  );
};

export default AnotherUserMiddle;
