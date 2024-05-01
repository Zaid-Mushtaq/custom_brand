import React, { Fragment } from "react";
import "../../../sass/components/account/userProfile/userAddress.scss";
import Input from "../../reuseable/input";
import CustomSelect from "../../reuseable/select";
import { SecondaryButton, PrimaryButton } from "../../reuseable/button";
import UserDetail from "./sub-components/userDetail";
import { useNavigate } from "react-router-dom";

const UserAddress = () => {
  const InputStyle = ["address-lable-text", "address-input"];
  const multipleInputClasses = ["custom-input-label", "custom-input"];
  const allClasses = [
    "lable-btn-text",
    "savebutton",
    "cancelbutton",
    "backToAccountLink",
  ];
  const navigate = useNavigate();

  const multipleSelectClasses = [
    "custom-select-container",
    "custom-select-label",
    "custom-select-input-box",
    "selected-option-text",
    "custom-dropdown-icon",
    "custom-options-list",
    "custom-options",
  ];

  const ProvinceOptions = [
    { value: "dr", label: "Drenthe" },
    { value: "fl", label: "Flevoland" },
    { value: "fr", label: "Friesland" },
    { value: "ge", label: "Gelderland" },
    { value: "gr", label: "Groningen" },
    { value: "li", label: "Limburg" },
    { value: "nb", label: "North Brabant" },
    { value: "nh", label: "North Holland" },
    { value: "ov", label: "Overijssel" },
    { value: "sh", label: "South Holland" },
    { value: "ut", label: "Utrecht" },
    { value: "ze", label: "Zeeland" },
  ];

  const handleLinkClick = () => {
    navigate(`/account`);
  };

  return (
    <Fragment>
      <div className="address-title-conatiner">
        <p className="address-edit-heading">{"Add/Edit Address"}</p>
      </div>
      <div className="user-address-form-data-container container">
        <div className="col-12 user-address-form-wrapper">
          <form className="user-address-form">
            <div className="name-container">
              <div className="firast-name-container">
                <Input
                  htmlFor="firstNameInput"
                  label={"First Name*"}
                  id="InputFirstName"
                  type="text"
                  ariaDescribedBy="firstNameHelp"
                  placeholder="First Name"
                  classes={InputStyle}
                  withLabel={true}
                />
              </div>
              <div className="last-name-container">
                <Input
                  htmlFor="firstNameInput"
                  label={"Last Name*"}
                  id="InputFirstName"
                  type="text"
                  ariaDescribedBy="firstNameHelp"
                  placeholder="Last Name"
                  classes={InputStyle}
                  withLabel={true}
                />
              </div>
            </div>

            <div className="street-container">
              <Input
                htmlFor="streetAddressInput"
                label={"Street Address*"}
                id="InputStreetAddress"
                type="text"
                ariaDescribedBy="streetAddressHelp"
                placeholder="Street Address"
                classes={InputStyle}
                withLabel={true}
              />
            </div>

            <div className="address-container">
              <div className="country-select-container">
                <Input
                  labelFor="billingCountryInput"
                  label="Country"
                  id="billingCountry"
                  type="text"
                  ariaDescribedBy="billingCountryHelp"
                  placeholder="Natherlands"
                  classes={multipleInputClasses}
                  withLabel={true}
                  readOnly={true}
                  labelDisabled={true}
                />
              </div>
              <div className="province-select-container">
                <CustomSelect
                  labelFor="selectCountryInput"
                  label="Province*"
                  placeholder="Province"
                  withLabel={true}
                  options={ProvinceOptions}
                  classes={multipleSelectClasses}
                />
              </div>
            </div>

            <div className="city-address-container">
              <div className="city-container">
                <Input
                  htmlFor="cityInput"
                  label={"City*"}
                  id="InputCity"
                  type="text"
                  ariaDescribedBy="CityHelp"
                  placeholder="City"
                  classes={InputStyle}
                  withLabel={true}
                />
              </div>
              <div className="postal-code-container">
                <Input
                  htmlFor="postalCodeInput"
                  label={"Postal Code*"}
                  id="InputPostalCode"
                  type="text"
                  ariaDescribedBy="PostalCodeHelp"
                  placeholder="Postal Code"
                  classes={InputStyle}
                  withLabel={true}
                />
              </div>
            </div>

            <div className="phone-number-container">
              <Input
                htmlFor="phoneNumberInput"
                label={"Phone Number*"}
                id="InputPhoneNumber"
                type="Tel"
                ariaDescribedBy="PhoneNumberHelp"
                placeholder="Phone Number"
                classes={InputStyle}
                withLabel={true}
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
                type="button"
                customClasses={allClasses}
                label={"Save Changes"}
              />
            </div>

            <div className="myAccount-link-container">
              <UserDetail backToAccountLink={true} />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAddress;
