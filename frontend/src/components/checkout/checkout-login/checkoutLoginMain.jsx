import React from "react";
import "../../../sass/components/checkout/checkoutLoginMain.scss";
import SignIn from "../../account/login/signIn";
import ForgotPassword from "../../account/login/sub-components/forgot-password";
import CreateAccount from "../../account/login/sub-components/create-account";
import CreateAccountStepTwo from "../../account/login/sub-components/create-account-step-two";
import CreateAccountStepThree from "../../account/login/sub-components/create-account-step-three";

const CheckoutLoginMain = ({
  checkoutProps,
  activeComponent,
  showPassword,
  isChecked,
  handleForgotPassword,
  handleCreateAccount,
  handleReturnToLogin,
  handleTogglePassword,
  handleCheckboxChange,
  handleCreateAccountTwo,
  handleCreateAccountThree,
}) => {
  return (
    <div>
      {activeComponent === "SignIn" && (
        <SignIn
          handleCreateAccount={handleCreateAccount}
          handleForgotPassword={handleForgotPassword}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
          checkoutProps={checkoutProps}
        />
      )}
      {activeComponent === "ForgotPassword" && (
        <ForgotPassword
          handleReturnToLogin={handleReturnToLogin}
          dynamicRouteProps={true}
        />
      )}
      {activeComponent === "CreateAccount" && (
        <CreateAccount
          handleReturnToLogin={handleReturnToLogin}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
          handleCreateAccountTwo={handleCreateAccountTwo}
          checkoutProps={checkoutProps}
        />
      )}
      {activeComponent === "CreateAccountTwo" && (
        <CreateAccountStepTwo
          dynamicRouteProps={true}
          handleCreateAccountThree={handleCreateAccountThree}
        />
      )}

      {activeComponent === "CreateAccountStepThree" && (
        <CreateAccountStepThree
          dynamicRouteProps={true}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      <hr className="devider" />
    </div>
  );
};

export default CheckoutLoginMain;
