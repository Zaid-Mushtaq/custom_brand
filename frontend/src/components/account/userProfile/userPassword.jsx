import React, { useState, useEffect, Fragment } from "react";
import Input from "../../reuseable/input";
import "../../../sass/components/account/userProfile/userPassword.scss";
import { PrimaryButton, SecondaryButton } from "../../reuseable/button";
import UserDetail from "./sub-components/userDetail";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, updatePassword } from "../../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import Loader from "../../../utils/loader.js";
const UserPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const InputStyle = [
    "lable-password",
    "user-password-input",
    "custom-password-icon",
    "custom-icon-eye",
  ];
  const allClasses = [
    "lable-btn-text",
    "savebutton",
    "cancelbutton",
    "backToAccountLink",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const handleToggleCurrentPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmNewPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLinkClick = () => {
    navigate(`/account`);
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const formDataObject = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const myForm = new FormData();

    for (const [key, value] of Object.entries(formDataObject)) {
      if (value) {
        myForm.set(key, value);
      }
    }
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      navigate("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated]);

  return (
    <Fragment>
      <div className="password-title-conatiner">
        <p className="password-edit-heading">
          {"Edit Password"}
        </p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="user-password-form-data-container container">
          <div className="col-12 user-password-form-wrapper">
            <form
              className="user-password-form"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
              <div className="current-password-container">
                <Input
                  htmlFor="currentPasswordInput"
                  label={"Current Password*"}
                  id="InputCurrentPassword"
                  type={showOldPassword ? "text" : "password"}
                  ariaDescribedBy="currentPasswordHelp"
                  placeholder="Current Password"
                  classes={InputStyle}
                  showPasswordIcon={true}
                  handleTogglePassword={handleToggleCurrentPassword}
                  withLabel={true}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  value={oldPassword}
                />
              </div>
              <div className="new-password-container">
                <Input
                  htmlFor="newPasswordInput"
                  label={"New Password*"}
                  id="InputNewtPassword"
                  type={showNewPassword ? "text" : "password"}
                  ariaDescribedBy="newPasswordHelp"
                  placeholder="New Password"
                  classes={InputStyle}
                  showPasswordIcon={true}
                  handleTogglePassword={handleToggleNewPassword}
                  withLabel={true}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="confirm-new-password-container">
                <Input
                  htmlFor="confirNewPasswordInput"
                  label={"Confirm Password*"}
                  id="InputConfirmNewtPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  ariaDescribedBy="confirmNewPasswordHelp"
                  placeholder="Confirm New Password"
                  classes={InputStyle}
                  showPasswordIcon={true}
                  handleTogglePassword={handleToggleConfirmNewPassword}
                  withLabel={true}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="button-container">
                <SecondaryButton
                  type="button"
                  customClasses={allClasses}
                  label={"Cancel"}
                  onClick={handleLinkClick}
                />
                <PrimaryButton
                  type="submit"
                  customClasses={allClasses}
                  label={"Change Password"}
                />
              </div>

              <div className="myAccount-link-container">
                <UserDetail backToAccountLink={true} />
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserPassword;
