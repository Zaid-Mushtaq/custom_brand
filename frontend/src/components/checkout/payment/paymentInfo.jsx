import React, { useState, useEffect } from "react";
import "../../../sass/components/checkout/paymentInfo.scss";
import CreditCardImage from "../../../assets/images/credit-card.jpg";
import PaypalImage from "../../../assets/images/paypal.png";
import CreditCard from "./sub-component/creditCard";
import MasterCardImage from "../../../assets/images/master-card.png";
import PayPal from "./sub-component/payPal";
import CustomRadio from "../../reuseable/radio";

const PaymentInfo = ({ price }) => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const formattedMonth =
      monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    return { value: formattedMonth, label: formattedMonth };
  });

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 2; // Adjust the range as needed
  const endYear = currentYear + 10; // Adjust the range as needed

  const yearOptions = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => {
      const year = startYear + index;
      return { value: year.toString(), label: year.toString() };
    }
  );

  useEffect(() => {
    const selectedRadio = document.querySelector(
      `input[name="paymentOption"][value="${selectedOption}"]`
    );
    if (selectedRadio) {
      selectedRadio.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedOption]);

  return (
    <div className="payment-conainer">
      <h2 className="payment-heading">Payment Info</h2>
      <div>
        <div className="radio-container common-wrapper">
          <div className="radio-button-container common-wrapper">
            <div className="credit-card-container">
              <div className="credit-card-text-radio">
                <CustomRadio
                  id="creditCard"
                  label="Credit card"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleRadioChange}
                />
                <p className="credit-card-text">Credit Card</p>
              </div>
              <div className="credit-card-image-container">
                <div className="card-container">
                  <img src={CreditCardImage} alt="credit-card-image" />
                </div>

                <div className="card-container">
                  <img src={MasterCardImage} alt="master-card-image" />
                </div>
              </div>
            </div>
            {/* <div className="paypal-container">
              <div className="paypal-image-container">
                <img src={PaypalImage} alt="paypal" />
              </div>
              <CustomRadio
                id="payPal"
                label="Paypal"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleRadioChange}
              />
            </div> */}
          </div>
        </div>
        {selectedOption === "option1" ? (
          <div>
            <CreditCard price={price} />
          </div>
        ) : (
          <PayPal />
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;
