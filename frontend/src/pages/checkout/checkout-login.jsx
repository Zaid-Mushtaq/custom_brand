import React, { useState } from "react";
import "../../sass/pages/checkout/checkoutLogin.scss";
import CheckoutGuest from "../../components/checkout/checkout-login/checkoutGuest";
import CheckoutCreateAccount from "../../components/checkout/checkout-login/checkoutCreateAccount";
import CheckoutLoginMain from "../../components/checkout/checkout-login/checkoutLoginMain";

const CheckoutLogin = () => {
  const [activeComponent, setActiveComponent] = useState("SignIn");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleForgotPassword = () => {
    setActiveComponent("ForgotPassword");
  };

  const handleCreateAccount = () => {
    setActiveComponent("CreateAccount");
  };

  const handleReturnToLogin = () => {
    setActiveComponent("SignIn");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCreateAccountTwo = () => {
    setActiveComponent("CreateAccountTwo");
  };

  const handleCreateAccountThree = () => {
    setActiveComponent("CreateAccountStepThree");
  };
  return (
    <div className="container-fluid checkout-login-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="checkout-login-wrapper">
              <CheckoutGuest />
              <CheckoutLoginMain
                checkoutProps={true}
                activeComponent={activeComponent}
                showPassword={showPassword}
                isChecked={isChecked}
                handleForgotPassword={handleForgotPassword}
                handleCreateAccount={handleCreateAccount}
                handleReturnToLogin={handleReturnToLogin}
                handleTogglePassword={handleTogglePassword}
                handleCheckboxChange={handleCheckboxChange}
                handleCreateAccountTwo={handleCreateAccountTwo}
                handleCreateAccountThree={handleCreateAccountThree}
              />
              {activeComponent !== "CreateAccountTwo" &&
                activeComponent !== "CreateAccountStepThree" && (
                  <CheckoutCreateAccount
                    handleCreateAccount={handleCreateAccount}
                    handleReturnToLogin={handleReturnToLogin}
                    activeComponent={activeComponent}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLogin;
