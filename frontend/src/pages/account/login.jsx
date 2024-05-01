import React, { useState } from "react";
import "../../sass/pages/account/login.scss";
import SignIn from "../../components/account/login/signIn";
import ForgotPassword from "../../components/account/login/sub-components/forgot-password";
import CreateAccount from "../../components/account/login/sub-components/create-account";
import CreateAccountStepTwo from "../../components/account/login/sub-components/create-account-step-two";
import CreateAccountStepThree from "../../components/account/login/sub-components/create-account-step-three";

const Login = () => {
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
    <div className="container-fluid login-page">
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 login-page-main-column">
            <div className="signIn-main-container">
              {activeComponent === "SignIn" && (
                <SignIn
                  handleCreateAccount={handleCreateAccount}
                  handleForgotPassword={handleForgotPassword}
                  showPassword={showPassword}
                  handleTogglePassword={handleTogglePassword}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
