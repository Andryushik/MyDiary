import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../hooks/useUserContext";
import Loading from "./Loading";
import "./changePasswordForm.css";
import PopUp from "./PopUp";

const ChangePasswordForm = ({ setModalPasswordActive }) => {
  const { user, dispatch } = useUserContext();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCopy, setNewPasswordCopy] = useState("");

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/password/${user?._id}`,
    (response) => {
      dispatch({
        type: "SET_USER",
        payload: response.result,
      });
      setSuccessPopUp(true);
    }
  );

  const clearModal = () => {
    setPassword("");
    setNewPassword("");
    setNewPasswordCopy("");
    setModalPasswordActive(false);
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  const changePassword = (e) => {
    e.preventDefault();

    if (newPassword === newPasswordCopy) {
      const updatedUserPassword = {
        _id: user._id,
        password,
        newPassword,
      };

      performFetch({
        method: "PUT",
        body: JSON.stringify(updatedUserPassword),
      });
    } else {
      setPopUpOpen(true);
    }
  };

  const closeModal = () => {
    setSuccessPopUp(false);
    clearModal();
  };

  return (
    <>
      <div className="changePasswordWrapper has-loading">
        <h2>Change password</h2>
        <form className="changePasswordForm" onSubmit={changePassword}>
          <label>Enter your old password</label>
          <input
            name="password"
            value={password}
            type="password"
            required
            minLength="8"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter the new password</label>
          <input
            name="newPassword"
            value={newPassword}
            type="password"
            required
            minLength="8"
            autoComplete="off"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Enter the new password again</label>
          <input
            name="newPasswordCopy"
            value={newPasswordCopy}
            type="password"
            required
            minLength="8"
            autoComplete="off"
            onChange={(e) => setNewPasswordCopy(e.target.value)}
            className={newPassword !== newPasswordCopy ? "input-warning" : ""}
          />
          <div className="buttonsWrapper">
            <button
              className="changePasswordCancel"
              type="button"
              onClick={() => clearModal()}
            >
              Cancel
            </button>
            <button className="changePasswordSubmit" type="submit">
              Confirm
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
        <div className="popup-message"> New passwords must match! </div>
      </PopUp>
      <PopUp isOpen={successPopUp} setPopUpOpen={closeModal} isInModal={true}>
        <div className="popup-message"> Password changed successfully! </div>
      </PopUp>
    </>
  );
};

ChangePasswordForm.propTypes = {
  setModalPasswordActive: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
