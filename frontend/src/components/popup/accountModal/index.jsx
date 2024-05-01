// CreateAccountModal.js
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "../../../sass/components/loginModal.scss";
import CreateAccount from "../../account/login/sub-components/create-account";
import CreateAccountStepTwo from "../../account/login/sub-components/create-account-step-two";
import CreateAccountStepThree from "../../account/login/sub-components/create-account-step-three";

const CreateAccountModal = ({
  handleClose,
  isChecked,
  handleCheckboxChange,
  showPassword,
  handleTogglePassword,
  handleReturnToLogin,
}) => {
  const [activeAccountComponent, setActiveAccountComponent] =
    useState("CreateAccount");

  const handleCreateAccountTwo = () => {
    setActiveAccountComponent("CreateAccountTwo");
  };

  const handleCreateAccountThree = () => {
    setActiveAccountComponent("CreateAccountStepThree");
  };

  return (
    <div className="custom-modal-wrapper">
      <div className="modal-backdrop" tabIndex="0" onClick={handleClose}></div>
      <div className="custom-modal custom-create-account-modal">
        <div className="modal-content">
          <button
            className="close"
            onClick={handleClose}
            aria-label="Close Modal"
          >
            <MdClose className="cross-icon" />
          </button>
          {activeAccountComponent === "CreateAccount" && (
            <CreateAccount
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
              handleReturnToLogin={handleReturnToLogin}
              handleCreateAccountTwo={handleCreateAccountTwo}
            />
          )}

          {activeAccountComponent === "CreateAccountTwo" && (
            <CreateAccountStepTwo
              dynamicRouteProps={true}
              handleCreateAccountThree={handleCreateAccountThree}
            />
          )}

          {activeAccountComponent === "CreateAccountStepThree" && (
            <CreateAccountStepThree
              dynamicRouteProps={true}
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
