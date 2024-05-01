import React from "react";
import { MdClose } from "react-icons/md";
import "../../../sass/components/loginModal.scss";
import SignIn from "../../account/login/signIn";

const LoginUser = ({
  isModalOpen,
  handleCloseModal,
  isChecked,
  handleCheckboxChange,
  showPassword,
  handleTogglePassword,
  handleCreateAccount,
  handleForgotPassword,
  setModalOpen,
}) => {
  return (
    <div className="custom-modal-wrapper">
      {isModalOpen && (
        <>
          <div
            className="modal-backdrop"
            tabIndex="0"
            onClick={handleCloseModal}
          ></div>
          <div className="custom-modal custom-login-modal">
            <div className="modal-content">
              <button
                className="close"
                onClick={handleCloseModal}
                aria-label="Close Modal"
              >
                <MdClose className="cross-icon" />
              </button>
              <SignIn
                handleCreateAccount={handleCreateAccount}
                handleForgotPassword={handleForgotPassword}
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
                showPassword={showPassword}
                handleTogglePassword={handleTogglePassword}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginUser;
