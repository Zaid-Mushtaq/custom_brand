import React, { useState } from "react";
import "../../../sass/components/checkout/customerInfo.scss";
import Input from "../../reuseable/input";
import CustomSelect from "../../reuseable/select";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { IoCompassOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AsYouType } from "libphonenumber-js";
import {
  saveShippingInfo,
  updateBillingInfo,
} from "../../../actions/cartAction";
import { useAlert } from "react-alert";
import { SecondaryButton } from "../../reuseable/button";

const ShippingAddress = ({ shippingInfo }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [address, setAddress] = useState(shippingInfo.address);
  const [firstName, setFirstName] = useState(shippingInfo.firstName);
  const [lastName, setLastName] = useState(shippingInfo.lastName);
  const [email, setEmail] = useState(shippingInfo.email);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Netherlands");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [apartment, setApartment] = useState(shippingInfo.apartment || "");
  const [isModified, setIsModified] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [countryCode, setCountryCode] = useState(shippingInfo.countryCode);

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
      setState(shippingInfo.state);
    }
  }, [country]);

  const shippingSubmit = (e) => {
    e.preventDefault();
    const formattedPhoneNo = phoneNo.replace(/\D/g, "");
    console.log(formattedPhoneNo);

    if (firstName.length < 2) {
      alert.error("Please enter a valid first Name");
      return;
    }

    if (formattedPhoneNo.length !== 11) {
      alert.error("Invalid phone number format");
      return;
    }

    // Check pin code length
    if (pinCode.length < 5) {
      alert.error("Pin code should be 5 digits");
      return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert.error("Please enter a valid email address");
      return;
    }

    const completeAddress = `${address}, ${city}, ${state}, ${pinCode}, ${country}`;
    dispatch(
      saveShippingInfo({
        firstName,
        lastName,
        address,
        email,
        city,
        state,
        country,
        phoneNo,
        pinCode,
        apartment,
        completeAddress,
        countryCode,
      })
    );

    alert.success("Successfully Save");
    setTimeout(() => {
      setReloadPage(true);
    }, 1500);
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

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
      apartment,
    };

    const shippingInfoObject = {
      address: shippingInfo.address || "",
      firstName: shippingInfo.firstName || "",
      lastName: shippingInfo.lastName || "",
      email: shippingInfo.email || "",
      city: shippingInfo.city || "",
      state: shippingInfo.state || "",
      country: shippingInfo.country || "",
      pinCode: shippingInfo.pinCode || "",
      phoneNo: shippingInfo.phoneNo || "",
      apartment: shippingInfo.apartment || "",
      countryCode: shippingInfo.countryCode || "",
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
    apartment,
    countryCode,
    shippingInfo,
  ]);

  //Phone Number

  const handlePhoneNoChange = (value) => {
    const countryCode = "+31";
    let formattedPhoneNo = value.trim();

    if (!formattedPhoneNo) {
      setPhoneNo("");
      return;
    }

    if (!formattedPhoneNo.startsWith(countryCode)) {
      // If the phone number does not start with the country code, add it
      formattedPhoneNo = countryCode + formattedPhoneNo;
    }

    // Create an instance of AsYouType for Netherlands
    const asYouType = new AsYouType("NL");

    // Input the phone number to get formatted output
    formattedPhoneNo = asYouType.input(formattedPhoneNo);

    // Ensure the area code and subscriber number follow the specified lengths
    formattedPhoneNo = formattedPhoneNo
      .replace(/\s/g, "")
      .replace(/(\d{2})(\d{7})/, `$1 $2`);

    setPhoneNo(formattedPhoneNo);
  };

  return (
    <div className="form-container">
      <h2 className="customer-info-heading">Shipping Address</h2>
      <form encType="multipart/form-data" onSubmit={shippingSubmit}>
        <div className="first-last-name-container common-wrapper">
          <div className="first-name-container">
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
          <div className="last-name-container">
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

        <div className="address-country-container common-wrapper">
          <div className="address-container">
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

          <div className="apartment-container">
            <Input
              labelFor="apartmentInput"
              label="Apartment/Unit"
              id="address"
              type="text"
              ariaDescribedBy="apartmentHelp"
              placeholder="Apartment / Unit"
              classes={multipleInputClasses}
              withLabel={false}
              value={apartment}
              onChange={(e) => setApartment(e.target.value.toLowerCase())}
            />
          </div>
        </div>

        <div className="postalCode-country-container common-wrapper">
          <div className="postal-code-container">
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
          <div className="country-container">
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
        </div>
        <div className="town-state-container common-wrapper">
          <div className="town-container">
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
          {country && (
            <div className="state-container">
              <CustomSelect
                labelFor="stateInput"
                label="State"
                placeholder={shippingInfo.state || "State"}
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

        <div className="email-telephone-container common-wrapper">
          <div className="email-container">
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
          <div className="telephone-container">
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
              readOnly={true}
              onChange={(e) => handlePhoneNoChange(e.target.value)}
            />
          </div>
        </div>
        <SecondaryButton
          label={"Save Address"}
          customClasses={"save-shipping-button"}
          type="submit"
          disabled={
            !state ||
            !email ||
            !phoneNo ||
            !isModified ||
            !address.length ||
            !city ||
            !pinCode
          }
        />
      </form>
    </div>
  );
};

export default ShippingAddress;
//Usama
