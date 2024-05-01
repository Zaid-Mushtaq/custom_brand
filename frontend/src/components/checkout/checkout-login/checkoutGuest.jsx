import React from "react";
import "../../../sass/components/checkout/checkoutGuest.scss";
import { Link } from "react-router-dom";

const CheckoutGuest = () => {
  return (
    <div className="checkout-guest-container">
      <div className="__heading-wrapper">
        <h2 className="__heading">Don't have an account ?</h2>
      </div>
      <div className="guest-button-wrapper">
        <Link to={"/checkout"} className="guest-button">
          Check out as guest
        </Link>
      </div>
      <hr className="devider" />
    </div>
  );
};

export default CheckoutGuest;
