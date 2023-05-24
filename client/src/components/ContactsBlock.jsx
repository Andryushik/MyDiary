import React from "react";
import PropTypes from "prop-types";
import "./contactsBlock.css";

const ContactsBlock = ({ icon, text, link }) => {
  const mailLink = link.match(/@/g);

  return (
    <div className="contact-block">
      <div>{icon}</div>
      <div className="contact-block-text">{text}</div>
      <div>
        <a
          className="mail-link"
          target="_blank"
          href={mailLink ? `mailto:${link}` : `https://${link}`}
          rel="noreferrer"
        >
          {link}
        </a>
      </div>
    </div>
  );
};

ContactsBlock.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  link: PropTypes.string,
};

export default ContactsBlock;
