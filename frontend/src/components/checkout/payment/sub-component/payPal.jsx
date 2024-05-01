import React from "react";
import { FaPaypal } from "react-icons/fa6";

const PayPal = () => {
  return (
    <>
      <div className="creditcard-zip-container common-wrapper">
        <div className="paypal-button-container">
          <button type="button" className="btn paypal-btn">
            <span>
              <FaPaypal />
            </span>
            <span>Paypal</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PayPal;
