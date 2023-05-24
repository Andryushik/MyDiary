import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SettingsMiddle from "../../components/SettingsMiddle";
import SettingsRight from "../../components/SettingsRight";
import "./Settings.css";
import Modal from "../../components/Modal";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import DeleteProfileForm from "../../components/DeleteProfileForm";

const Settings = () => {
  const [modalPasswordActive, setModalPasswordActive] = useState(false);
  const [modalDeleteActive, setModalDeleteActive] = useState(false);

  return (
    <div className="page-container">
      <Navbar active={"Settings"} />
      <SettingsMiddle
        setModalPasswordActive={setModalPasswordActive}
        setModalDeleteActive={setModalDeleteActive}
      />
      <SettingsRight />
      <Modal active={modalPasswordActive} setActive={setModalPasswordActive}>
        <ChangePasswordForm setModalPasswordActive={setModalPasswordActive} />
      </Modal>
      <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
        <DeleteProfileForm setModalDeleteActive={setModalDeleteActive} />
      </Modal>
    </div>
  );
};

export default Settings;
