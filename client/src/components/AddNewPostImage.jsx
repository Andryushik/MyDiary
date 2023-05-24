import React, { useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch.js";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";

const AddNewPostImage = ({ imageUrl, setImageUrl, userId, setImgLoading }) => {
  const inputFileRef = useRef(null);

  const { error, cancelFetch, performFetch } = useFetch(
    `/post/upload/${userId}`,
    (response) => {
      setImageUrl(response.result);
      setImgLoading(false);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    return cancelFetch;
  }, [imageUrl]);

  const uploadImageSubmit = (event) => {
    setImgLoading(true);
    const formData = new FormData();
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    formData.append("file", selectedFile);

    performFetch(
      {
        method: "POST",
        body: formData,
      },
      true
    );
  };

  return (
    <>
      <button
        type="button"
        className="new-post attach"
        onClick={() => inputFileRef.current.click()}
      >
        {icons.attach}
      </button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={uploadImageSubmit}
        hidden
      />
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
    </>
  );
};

AddNewPostImage.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func.isRequired,
  setImgLoading: PropTypes.func,
  userId: PropTypes.string,
};

export default AddNewPostImage;
