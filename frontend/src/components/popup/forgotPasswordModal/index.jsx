import React from "react";
import "../../../sass/components/loginModal.scss";
import { MdClose } from "react-icons/md";
import ForgotPassword from "../../account/login/sub-components/forgot-password";

const ForgotPasswordModal = ({ handleClose, handleReturnToLogin }) => {
  return (
    <div className="custom-modal-wrapper">
      <div className="modal-backdrop" tabIndex="0" onClick={handleClose}></div>
      <div className="custom-modal custom-forgot-password-modal">
        <div className="modal-content">
          <button
            className="close"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            <MdClose className="cross-icon" />
          </button>
          <div className="heading-wrapper">
            <h3 className="heading">Forgot your Password</h3>
            <p className="description">
              Provide your account email address to receive an email to reset
              your password.
            </p>
          </div>
          <ForgotPassword handleReturnToLogin={handleReturnToLogin} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
