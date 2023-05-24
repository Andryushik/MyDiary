import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../hooks/useUserContext";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ProfilePicture from "./ProfilePicture";
import PopUp from "./PopUp";

const SettingsChangePP = () => {
  const { user, dispatch } = useUserContext();
  const inputFileRef = useRef(null);
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const { error, cancelFetch, performFetch } = useFetch(
    `/user/upload/${user?._id}`,
    (response) => {
      dispatch({
        type: "SET_USER",
        payload: { ...user, profilePicture: response.result },
      });
      setPopUpOpen(true);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const uploadPhotoSubmit = (event) => {
    const formData = new FormData();
    const selectedFile = event.target.files[0];
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
    <div className="settings-change-PP">
      <PopUp isOpen={isPopUpOpen} setPopUpOpen={setPopUpOpen}>
        <div className="popup-message">
          Profile picture uploaded successfully!
        </div>
      </PopUp>
      <ProfilePicture profilePicture={user?.profilePicture} size={"medium"} />

      <button
        type="button"
        className="add-photo-button"
        onClick={() => inputFileRef.current.click()}
      >
        <AddAPhotoOutlinedIcon sx={{ fontSize: "60px" }} />
      </button>

      <input
        ref={inputFileRef}
        type="file"
        onChange={uploadPhotoSubmit}
        hidden
      />
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

export default SettingsChangePP;
