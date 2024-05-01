import React, { useEffect, useState } from "react";
import "../../../../sass/components/account/accountProfile/resetPassword.scss";
import Input from "../../../reuseable/input";
import { PrimaryButton, SecondaryButton } from "../../../reuseable/button";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, resetPassword } from "../../../../actions/userAction";
import Loader from "../../../../utils/loader";
import { Fragment } from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const InputStyle = [
    "",
    "custom-input",
    "custom-password-icon-container",
    "custom-eye-icon",
  ];

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors(error));
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [error, alert, dispatch, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container-fluid reset_password_conatainer_fluid">
            <div className="container reset_password_conatainer">
              <h2 className="heading-reset">Reset Password</h2>
              <div className="col-12">
                <div className="reser-password-wrapper">
                  <form
                    className="reser-password-form"
                    onSubmit={handleResetPasswordSubmit}
                  >
                    <div className="newPassword-input-container">
                      <Input
                        labelFor="passwordInput"
                        id="InputPassword"
                        label={"* New Password"}
                        type={showPassword ? "text" : "password"}
                        ariaDescribedBy="passwordHelp"
                        placeholder="Enter Your Password"
                        classes={InputStyle}
                        withLabel={true}
                        showPasswordIcon={true}
                        handleTogglePassword={handleTogglePassword}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        name="password"
                      />
                    </div>

                    <div className="password-description-container">
                      <p className="password-description-text">
                        Password must be a minimum of 8 characters and contain
                        upper and lower case letters, ONE special character and
                        at least ONE number.
                      </p>
                    </div>

                    <div className="confirmPassword-input-container">
                      <Input
                        labelFor="passwordInput"
                        id="InputPassword"
                        label={"* Confirm New Password"}
                        type="text"
                        ariaDescribedBy="passwordHelp"
                        placeholder="Enter Your Password"
                        classes={InputStyle}
                        withLabel={true}
                        showPasswordIcon={false}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                        name="confirmPassword"
                      />
                    </div>

                    <div className="reset-button-container">
                      <PrimaryButton
                        label={"Save Changes"}
                        customClasses={"save-button"}
                        type="submit"
                      />
                      <SecondaryButton
                        label={"Cancel"}
                        customClasses={"cancel-button"}
                        type="button"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
