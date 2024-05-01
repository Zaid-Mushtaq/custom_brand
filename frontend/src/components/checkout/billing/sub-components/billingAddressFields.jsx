import React, { useState } from "react";
import CustomSelect from "../../../reuseable/select";
import Input from "../../../reuseable/input";
import { useDispatch, useSelector } from "react-redux";
import { updateBillingInfo } from "../../../../actions/cartAction";
import { AsYouType } from "libphonenumber-js";
import { useEffect } from "react";
import { Country, State } from "country-state-city";
import { SecondaryButton } from "../../../reuseable/button";
import { useAlert } from "react-alert";
import Loader from "../../../../utils/loader";
const BillingAddressFields = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const alert = useAlert();
  const { billingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Netherlands");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  State.getStatesOfCountry(country).map((item) => (
    <option key={item.isoCode} value={item.isoCode}>
      {item.name}
    </option>
  ));

  useEffect(() => {
    const countryObject = Country.getAllCountries().find(
      (c) => c.name === country
    );

    if (countryObject) {
      const countryCode = countryObject.isoCode;
      const states = State.getStatesOfCountry(countryCode);
      const options = states.map((item) => ({
        value: item.isoCode,
        label: item.name,
      }));
      setStateOptions(options);
      setCountryCode(countryCode);
      setState(billingInfo?.state);
    }
  }, [country]);

  const multipleSelectClasses = [
    "custom-select-container",
    "custom-select-label",
    "custom-select-input-box",
    "selected-option-text",
    "custom-dropdown-icon",
    "custom-options-list",
    "custom-options",
  ];
  const multipleInputClasses = ["custom-input-label", "custom-input"];

  //Phone Number
  const handlePhoneNoChange = (value) => {
    const countryCode = "+31";
    let formattedPhoneNo = value.trim();

    if (!formattedPhoneNo) {
      setPhoneNo("");
      return;
    }

    if (!formattedPhoneNo.startsWith(countryCode)) {
      formattedPhoneNo = countryCode + formattedPhoneNo;
    }
    const asYouType = new AsYouType("NL");

    formattedPhoneNo = asYouType.input(formattedPhoneNo);

    formattedPhoneNo =
      formattedPhoneNo &&
      formattedPhoneNo.replace(/\s/g, "").replace(/(\d{2})(\d{7})/, `$1 $2`);

    setPhoneNo(formattedPhoneNo);
  };

  useEffect(() => {
    const currentFormValues = {
      address,
      firstName,
      lastName,
      email,
      city,
      state,
      country,
      pinCode,
      phoneNo,
    };

    const shippingInfoObject = {
      address: billingInfo?.address || "",
      firstName: billingInfo?.firstName || "",
      lastName: billingInfo?.lastName || "",
      email: billingInfo?.email || "",
      city: billingInfo?.city || "",
      state: billingInfo?.state || "",
      country: billingInfo?.country || "",
      pinCode: billingInfo?.pinCode || "",
      phoneNo: billingInfo?.phoneNo || "",
      countryCode: billingInfo?.countryCode || "",
    };

    const isAnyFieldModified = Object.entries(currentFormValues).some(
      ([key, value]) => value !== shippingInfoObject[key]
    );

    setIsModified(isAnyFieldModified);
  }, [
    address,
    firstName,
    lastName,
    email,
    city,
    state,
    country,
    pinCode,
    phoneNo,
    countryCode,
    billingInfo,
  ]);

  const handleSaveBilling = (e) => {
    e.preventDefault();
    const formattedPhoneNo = phoneNo.replace(/\D/g, "");

    if (formattedPhoneNo.length !== 11) {
      alert.error("Invalid phone number format");
      return;
    }
    if (firstName.length < 2) {
      alert.error("Please enter a valid first Name");
      return;
    }

    if (pinCode.length !== 5) {
      alert.error("Pin code should be 5 digits");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert.error("Please enter a valid email address");
      return;
    }

    const billingFormData = {
      firstName,
      lastName,
      address,
      email,
      city,
      state,
      country,
      pinCode,
      phoneNo,
    };

    dispatch(updateBillingInfo(billingFormData));
    sessionStorage.setItem("billingFormData", JSON.stringify(billingFormData));
    alert.success("Successfully add the Billing Address");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="firstLast-name-container common-wrapper">
            <div className="first-name-conatiner">
              <Input
                labelFor="firstNameInput"
                label="First Name"
                id="firstName"
                type="text"
                ariaDescribedBy="firstNameHelp"
                placeholder="First Name"
                classes={multipleInputClasses}
                withLabel={false}
                value={firstName}
                required={true}
                onChange={(e) => setFirstName(e.target.value.toLowerCase())}
              />
            </div>
            <div className="last-name-conatiner">
              <Input
                labelFor="lastNameInput"
                label="Last Name"
                id="lastName"
                type="text"
                ariaDescribedBy="lastNameHelp"
                placeholder="Last Name"
                classes={multipleInputClasses}
                withLabel={false}
                value={lastName}
                required={true}
                onChange={(e) => setLastName(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          <div className="billing-street-address-container common-wrapper">
            <div className="street-address-container">
              <Input
                labelFor="addressInput"
                label="Address"
                id="address"
                type="text"
                ariaDescribedBy="addressHelp"
                placeholder="Street Address"
                classes={multipleInputClasses}
                withLabel={false}
                value={address}
                required={true}
                onChange={(e) => setAddress(e.target.value.toLowerCase())}
              />
            </div>
            <div className="city-container">
              <Input
                labelFor="cityInput"
                label="City"
                id="townCity"
                type="text"
                ariaDescribedBy="townCityHelp"
                placeholder="City"
                classes={multipleInputClasses}
                withLabel={false}
                value={city}
                required={true}
                onChange={(e) => setCity(e.target.value.toLowerCase())}
              />
            </div>

            <div className="state-zip-container">
              <div className="zip-container">
                <Input
                  labelFor="postalCodeInput"
                  label="Postal Code "
                  id="postalCode"
                  type="text"
                  ariaDescribedBy="postalCodeHelp"
                  placeholder="Postal Code"
                  classes={multipleInputClasses}
                  value={pinCode}
                  required={true}
                  onChange={(e) => setPinCode(e.target.value.toUpperCase())}
                />
              </div>
            </div>
          </div>

          <div className="billing-country-province-container common-wrapper">
            <div className="billing-country-container">
              <Input
                labelFor="countryInput"
                label="Country"
                id="country"
                readOnly={true}
                type="text"
                ariaDescribedBy="countryHelp"
                placeholder="Netherlands"
                classes={multipleInputClasses}
                withLabel={false}
                labelDisabled={true}
                value={"Netherlands"}
                required={true}
                onChange={(selectedCountry) => setCountry(selectedCountry)}
              />
            </div>
            <div className="billing-province-container">
              {country && (
                <div className="state-container">
                  <CustomSelect
                    labelFor="stateInput"
                    label="State"
                    placeholder={billingInfo?.state || "State"}
                    options={stateOptions}
                    classes={multipleSelectClasses}
                    withLabel={false}
                    value={state}
                    required={true}
                    onChange={(selectedState) => setState(selectedState)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="billing-email-telephone-container common-wrapper">
            <div className="billing-email-container">
              <Input
                labelFor="emailInput"
                label="Email"
                id="emailInput"
                type="email"
                ariaDescribedBy="emailHelp"
                placeholder="Email Address"
                classes={multipleInputClasses}
                withLabel={false}
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </div>
            <div className="billing-telephone-container">
              <Input
                labelFor="telephoneInput"
                label="Telephone"
                id="telephone"
                type="tel"
                ariaDescribedBy="telephoneHelp"
                placeholder="+31 5435465705"
                classes={multipleInputClasses}
                withLabel={false}
                value={phoneNo}
                required={true}
                onChange={(e) => handlePhoneNoChange(e.target.value)}
              />
            </div>
          </div>

          <SecondaryButton
            label={"Save Billing "}
            customClasses={"save-billing-button"}
            type="submit"
            onClick={handleSaveBilling}
            disabled={
              !state ||
              !email ||
              !phoneNo ||
              !isModified ||
              !firstName ||
              !lastName ||
              !address
            }
          />
        </>
      )}
    </>
  );
};

export default BillingAddressFields;
