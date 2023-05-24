import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./deleteProfileForm.css";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import useLogout from "../hooks/useLogout";
import Loading from "./Loading";
import PopUp from "./PopUp";

const DeleteProfileForm = ({ setModalDeleteActive }) => {
  const { user } = useUserContext();
  const [deleteWord, setDeleteWord] = useState("");
  const logout = useLogout();

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${user?._id}`,
    () => {
      logout();
    }
  );

  const clearModal = () => {
    setDeleteWord("");
    setModalDeleteActive(false);
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  const deleteProfile = (e) => {
    e.preventDefault();
    if (deleteWord !== "delete") {
      setPopUpOpen(true);
      return;
    }
    setConfirmPopup(true);
  };
  const confirmDelete = () => {
    setConfirmPopup(false);
    performFetch({
      method: "DELETE",
    });
  };
  return (
    <>
      <div className="deleteProfileWrapper has-loading">
        <h2>DELETE PROFILE</h2>
        <div className="attention">
          ATTENTION!!! This action is irreversible!
        </div>
        <form className="deleteProfileForm" onSubmit={deleteProfile}>
          <label>
            Enter &quot;<b>delete</b>&quot; for confirm:
          </label>
          <input
            name="deleteWord"
            value={deleteWord}
            type="text"
            required
            minLength={6}
            onChange={(e) => setDeleteWord(e.target.value)}
          />

          <div className="buttonsWrapper">
            <button
              className="deleteCancel"
              type="button"
              onClick={() => clearModal()}
            >
              CANCEL
            </button>
            <button className="deleteSubmit" type="submit">
              DELETE
            </button>
          </div>
        </form>
        {isLoading && <Loading />}
      </div>
      <br />

      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
      <PopUp isOpen={isPopUpOpen} setPopUpOpen={setPopUpOpen} isInModal={true}>
        <div className="popup-message">
          If you want to delete your profile permanently; enter
          &apos;delete&apos; in the field below
        </div>
      </PopUp>
      <PopUp
        isOpen={confirmPopup}
        setPopUpOpen={setConfirmPopup}
        isInModal={true}
      >
        <div className="popup-message">
          Are you sure you want to DELETE your account and all data?
        </div>

        <button className="button-white" onClick={confirmDelete}>
          Yes
        </button>
      </PopUp>
    </>
  );
};

DeleteProfileForm.propTypes = {
  setModalDeleteActive: PropTypes.func.isRequired,
};

export default DeleteProfileForm;
