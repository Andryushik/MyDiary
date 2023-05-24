import React, { useState, useEffect } from "react";
import "./trendingTags.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { sanitizeTags } from "../util/sanitizeTags";

const TrendingTags = () => {
  const [popularTags, setPopularTags] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags/${8}`,
    (data) => {
      setPopularTags(data.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [popularTags]);

  return (
    <>
      <h3 className="popular-tag-h3">Popular Tags</h3>
      <div className="tags-container">
        {error && (
          <div className="error">
            {typeof error === "string"
              ? error
              : "Error happened. Refresh the page"}
          </div>
        )}
        {popularTags.map((popularTag) => {
          return (
            <div key={popularTag} className="tags has-loading">
              {isLoading && <Loading />}
              <Link to={`/search/tags/${sanitizeTags(popularTag)}`}>
                <p>{sanitizeTags(popularTag)}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingTags;
