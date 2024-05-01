import React from "react";
import "../../../../sass/components/account/login/signIn.scss";
import { PrimaryButton } from "../../../reuseable/button";
import { Link } from "react-router-dom";
import Input from "../../../reuseable/input";
import CustomCheckbox from "../../../reuseable/checkbox";

const CreateAccountStepThree = ({
  dynamicRouteProps,
  isChecked,
  handleCheckboxChange,
}) => {
  const InputStyle = [
    "",
    "custom-input",
    "custom-password-icon-container",
    "custom-eye-icon",
  ];

  const checkboxClasses = [
    "",
    "create_account_checkbox_label",
    "create_account_checkbox_input",
  ];

  return (
    <div className="createAccountThree-form-container">
      {dynamicRouteProps && (
        <div className="__heading-wrapper">
          <h3 className="_heading">Add your phone number</h3>
          <p className="_create-account-description">
            Find out about exclusive offers, new drops & more!
          </p>
        </div>
      )}

      <form className="create-account-form">
        <div className="phone-input-container">
          <Input
            labelFor="phoneInput"
            id="phone"
            type="text"
            ariaDescribedBy="phoneHelp"
            placeholder="Enter your phone number (optional)"
            classes={InputStyle}
            withLabel={false}
            // value={phone}
            required={true}
            // onChange={registerDataChange}
            name="firstName"
          />
        </div>

        <div className="createAccount_container">
          <div className="__form_check">
            <CustomCheckbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              customCheckboxClasses={checkboxClasses}
            />
            <div className="custom-label-container">
              <p className="custom-label-text">
                By checking this box, you agree to receive recurring automated
                marketing text messages (e.g. cart reminders) from Dynamite at
                the cell number used when signing up. Consent is not a condition
                of any purchase. Reply STOP to cancel.
              </p>
            </div>
          </div>
        </div>

        <div className="create-account-button-container">
          <PrimaryButton
            label={"Done"}
            customClasses={"create-account-button"}
            type="submit"
          />
        </div>

        <Link className="skip-link">Skip</Link>
      </form>
    </div>
  );
};

export default CreateAccountStepThree;
