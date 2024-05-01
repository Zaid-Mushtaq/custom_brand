import React from "react";
import Input from "../../../reuseable/input";
import CustomSelect from "../../../reuseable/select";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { useNavigate } from "react-router";

const CreditCard = () => {
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

  return (
    <>
      <form>
        <div className="creditcard-fullData-container common-wrapper">
          <div className="cardNumber-container">
            {/* <Input
            labelFor="fullNameInput"
            label="Full Name"
            id="fullName"
            type="text"
            ariaDescribedBy="fullNameHelp"
            placeholder="Full Name"
            classes={multipleInputClasses}
            withLabel={false}
          /> */}

            <CardNumberElement className="form-control common-input custom-input" />
          </div>
          {/* <div className="paypal-container">
          <Input
            labelFor="billingZipInput"
            label="Billing Zip"
            id="billingZipNumber"
            type="number"
            ariaDescribedBy="billingZipNumberHelp"
            placeholder="Enter Billing Zip Code"
            classes={multipleInputClasses}
            withLabel={true}
          />
        </div> */}
        </div>

        <div className="creditcard-number-container common-wrapper">
          <div className="number-container">
            {/* <Input
            labelFor="numberInput"
            label="Credit Card Number"
            id="creditCardNumber"
            type="text"
            ariaDescribedBy="creditCardNumberHelp"
            placeholder="Credit Card Number"
            classes={multipleInputClasses}
            withLabel={false}
          /> */}
          </div>
        </div>

        <div className="month-year-cvc-container common-wrapper">
          <div className="date-container">
            <CardExpiryElement className="form-control common-input custom-input" />
          </div>
          <div className="cvc-container">
            <CardCvcElement className="form-control common-input custom-input" />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreditCard;
