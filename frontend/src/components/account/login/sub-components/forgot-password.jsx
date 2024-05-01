import React, { Fragment, useState, useEffect } from "react";
import "../../../../sass/components/account/login/signIn.scss";
import Input from "../../../reuseable/input";
import { PrimaryButton, SecondaryButton } from "../../../reuseable/button";
import Loader from "../../../../utils/loader";
import { clearErrors, forgotPassword } from "../../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ForgotPassword = ({ handleReturnToLogin, dynamicRouteProps }) => {
  const InputStyle = ["lable-text", "custom-input"];
  const allClasses = ["lable-btn-text", "savebutton", "cancelbutton"];

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, messages, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const formDataObject = {
      email,
    };
    const myForm = new FormData();
    for (const [key, value] of Object.entries(formDataObject)) {
      if (value) {
        myForm.set(key, value);
      }
    }

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (messages) {
      alert.success(messages);
    }
  }, [dispatch, error, alert, messages]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="forgotPassword-form-container">
            {dynamicRouteProps && (
              <div className="__heading-wrapper">
                <h3 className="_heading">Forgot your Password</h3>
                <p className="_description">
                  Provide your account email address to receive an email to
                  reset your password.
                </p>
              </div>
            )}
            <form
              className="forgot-password-form"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="__email-input-container">
                <Input
                  labelFor="emailInput"
                  id="InputEmail"
                  type="email"
                  ariaDescribedBy="emailHelp"
                  placeholder="Enter Your Email"
                  classes={InputStyle}
                  withLabel={false}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="send-button-container">
                <PrimaryButton
                  label={"Send"}
                  customClasses={"send-button"}
                  type="submit"
                />
              </div>

              <div className="return-to-login-button-container">
                <SecondaryButton
                  label={"Return to Login"}
                  onClick={handleReturnToLogin}
                  customClasses={"return-button"}
                />
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
