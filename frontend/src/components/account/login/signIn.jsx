import React, { useState, useRef, useEffect } from "react";
import Input from "../../reuseable/input";
import CustomCheckbox from "../../reuseable/checkbox";
import "../../../sass/components/account/login/signIn.scss";
import { PrimaryButton } from "../../reuseable/button";
import { Link } from "react-router-dom";
import SocialLinks from "./sub-components/social-links";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router";
import { clearErrors, login } from "../../../actions/userAction";
import TermsConditions from "./sub-components/terms-conditions";
import Loader from "../../../utils/loader";
const SignIn = ({
  handleCreateAccount,
  handleForgotPassword,
  isChecked,
  handleCheckboxChange,
  showPassword,
  handleTogglePassword,
  setModalOpen = false,
  checkoutProps,
}) => {
  const InputStyle = [
    "",
    "custom-input",
    "custom-password-icon-container",
    "custom-eye-icon",
  ];

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, loginUser } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const location = useLocation();
  const checkboxClasses = [" ", "custom_label", "custom_input"];

  const redirect = location.search ? location.search.split("=")[1] : "account";
  const loginSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(loginEmail, loginPassword));
      if (setModalOpen) {
        setModalOpen(false);
      }

      setTimeout(() => {
        navigate(`/${redirect}`);
        setLoginPassword("");
        setLoginEmail("");
      }, "3000");
    } catch (error) {
      if (setModalOpen) {
        setModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }

    if (loginUser) {
      alert.success("Login Successfully");
      dispatch({ type: "SHOW_LOGIN_SUCCESS_ALERT" });
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect, loginUser]);

  return (
    <div className="signIn-form-container">
      <div className="signIn-Heading-container">
        {!checkoutProps ? (
          <h2 className="sinIn-heading">Sign In</h2>
        ) : (
          <h2 className="checkout-sinIn-heading">
            Login to your account to checkout
          </h2>
        )}

        <p className="sinIn-text">
          Enter your details to sign in to your account
        </p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <form className="login-form" ref={loginTab} onSubmit={loginSubmit}>
          <div className="email-input-container">
            <Input
              labelFor="emailInput"
              id="InputEmail"
              type="email"
              ariaDescribedBy="emailHelp"
              placeholder="Enter Your Email"
              classes={InputStyle}
              withLabel={false}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="password-input-container">
            <Input
              labelFor="passwordInput"
              id="InputPassword"
              type={showPassword ? "text" : "password"}
              ariaDescribedBy="passwordHelp"
              placeholder="Enter Your Password"
              classes={InputStyle}
              withLabel={false}
              showPasswordIcon={true}
              handleTogglePassword={handleTogglePassword}
              required={true}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password-container">
            <div className="form-check">
              <CustomCheckbox
                label="Keep me Signed in"
                checked={isChecked}
                onChange={handleCheckboxChange}
                customCheckboxClasses={checkboxClasses}
              />
            </div>
            <div className="forgot-password-link-container">
              <Link
                className="forgot-password-link-text"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="submit-button-container">
            <PrimaryButton
              label={"Login"}
              type="submit"
              value="Login"
              customClasses={"submit-button"}
            />
          </div>
          <SocialLinks />

          {!checkoutProps ? (
            <TermsConditions
              handleCreateAccount={handleCreateAccount}
              dynamicTextProps={"Register"}
            />
          ) : null}
        </form>
      )}
    </div>
  );
};

export default SignIn;
