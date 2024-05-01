import React from "react";
import "../../../../sass/components/account/login/signIn.scss";
import { PrimaryButton } from "../../../reuseable/button";
import { Link } from "react-router-dom";
import Input from "../../../reuseable/input";

const CreateAccountStepTwo = ({
  dynamicRouteProps,
  handleCreateAccountThree,
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
    <div className="createAccountTwo-form-container">
      {dynamicRouteProps && (
        <div className="__heading-wrapper">
          <h3 className="_heading">Almost There!</h3>
          <p className="_create-account-description">
            Finish filling out your profile and unlock 10% OFF your next
            purchase
          </p>
        </div>
      )}

      <form className="create-account-form">
        <div className="firstName-input-container ">
          <Input
            labelFor="firstNameInput"
            id="createAccountFirstName"
            type="text"
            ariaDescribedBy="firstNameHelp"
            placeholder="First Name"
            classes={InputStyle}
            withLabel={false}
            // value={firstName}
            required={true}
            // onChange={registerDataChange}
            name="firstName"
          />
        </div>

        <div className="lastName-input-container ">
          <Input
            labelFor="lastNameInput"
            id="createAccountLastName"
            type="text"
            ariaDescribedBy="lastNameHelp"
            placeholder="Last Name"
            classes={InputStyle}
            withLabel={false}
            // value={lastName}
            required={true}
            // onChange={registerDataChange}
            name="lastName"
          />
        </div>

        <div className="dob-input-container ">
          <Input
            labelFor="dobInput"
            id="createAccountdob"
            type="date"
            ariaDescribedBy="dobHelp"
            placeholder="mm/dd/yyyy"
            classes={InputStyle}
            withLabel={false}
            // value={email}
            required={true}
            // onChange={registerDataChange}
            name="lastName"
          />
        </div>

        <div className="zipcode-input-container ">
          <Input
            labelFor="zipcodeInput"
            id="zipcode"
            type="text"
            ariaDescribedBy="zipcodeHelp"
            placeholder="Zip Code"
            classes={InputStyle}
            withLabel={false}
            // value={email}
            required={true}
            // onChange={registerDataChange}
            name="zipcode"
          />
        </div>

        <div className="create-account-button-container">
          <PrimaryButton
            label={"Continue"}
            customClasses={"create-account-button"}
            type="submit"
            onClick={handleCreateAccountThree}
          />
        </div>

        <Link onClick={handleCreateAccountThree} className="skip-link">
          Skip
        </Link>
      </form>
    </div>
  );
};

export default CreateAccountStepTwo;
