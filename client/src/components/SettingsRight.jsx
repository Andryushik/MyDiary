import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import ContactsBlock from "./ContactsBlock";
import PopUp from "./PopUp";
import Privacy from "./Privacy";
import Copyright from "./Copyright";

const SettingsRight = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [copyrightOpen, setCopyrightOpen] = useState(false);

  const openPrivacy = (e) => {
    e.stopPropagation();
    setPrivacyOpen(true);
  };
  const openCopyright = (e) => {
    e.stopPropagation();
    setCopyrightOpen(true);
  };

  return (
    <div className="right-section">
      <div className="single-container settings-right-wrapper">
        <span className="settings-right-title">
          How to contact us for a variety of reasons
        </span>

        <div className="settings-right-contacts">
          <ContactsBlock
            icon={<EmailOutlinedIcon fontSize="large" />}
            text={"You could write us if you any questions or issues:"}
            link={"deardiaryteam@proton.me"}
          />

          <ContactsBlock
            icon={<ContactMailOutlinedIcon fontSize="large" />}
            text={"You could also send us your feedback:"}
            link={"c41hyftwo@gmail.com"}
          />

          <ContactsBlock
            icon={<LanguageOutlinedIcon fontSize="large" />}
            text={
              "This project was made by HackYourFuture students. You can find more information about the organization here:"
            }
            link={"hackyourfuture.net"}
          />

          <ContactsBlock
            icon={<WebOutlinedIcon fontSize="large" />}
            text={"Link to the GitHub:"}
            link={"github.com/HackYourFuture"}
          />

          <div className="copyrights">
            <small>
              We care about your privacy, and here you can read{" "}
              <span className="privacy-button" onClick={openPrivacy}>
                our privacy policy
              </span>
              .
            </small>
            <PopUp isOpen={privacyOpen} setPopUpOpen={setPrivacyOpen}>
              <Privacy />
            </PopUp>
            <br />
            <br />
            <small>
              {" "}
              <span className="privacy-button" onClick={openCopyright}>
                Copyright
              </span>{" "}
              &copy; 2023 <br /> HackYourFuture students team
            </small>
            <PopUp isOpen={copyrightOpen} setPopUpOpen={setCopyrightOpen}>
              <Copyright />
            </PopUp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsRight;
