import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../sass/components/notification.scss";

const Notification = ({ message, show, onClose }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div className={`notification-popup ${show ? "visible" : ""}`}>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
