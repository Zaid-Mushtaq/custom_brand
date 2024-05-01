import React from "react";
import "../../sass/components/thankyou/thankYouMessage.scss";
import { CiCircleCheck } from "react-icons/ci";

const ThankYouMessage = ({ orderNo }) => {
  return (
    <div className="thankyou-message-container">
      <div className="thankyou-heading-wrapper">
        <h2 className="thankyou-text">thank you</h2>
        <p className="description-text">for shopping with us!</p>
      </div>

      <div className="check-container">
        <CiCircleCheck className="check-mark-icon" />
      </div>

      <div className="thankyou-notification-wrapper">
        <p className="recieve-text">
          Thank you for choosing us. Your order has been received and a
          confirmation email is on its way
        </p>
        <p className="order-text">
          Your Order No: <span>{orderNo && orderNo}</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ThankYouMessage;
