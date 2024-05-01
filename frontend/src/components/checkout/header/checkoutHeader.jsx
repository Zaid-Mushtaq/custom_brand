import React from "react";
import "../../../sass/components/checkout/checkoutHeader.scss";
import { Link } from "react-router-dom";

const CheckoutHeader = () => {
  const currentRoute = window.location.pathname;

  return (
    <div className="checkout-header container-fluid">
      <div className="header-wrapper">
        {currentRoute === "/checkout" ? (
          <div className="cheakout-logo">
            <a href="/">
              <h2 className="__heading">
                <span className="span1">DC</span>
                <span className="span2">Technology</span>
              </h2>
            </a>
          </div>
        ) : (
          <div className="checkout-login-logo">
            <a href="/">
              <h2 className="__heading">
                <span className="span1">DC</span>
                <span className="span2">Technology</span>
              </h2>
            </a>
          </div>
        )}

        {currentRoute === "/checkout" ? (
          <div className="cheakout-header-icons">
            <div className="delivery-icon-wrapper">
              <div className="delivery-icon">
                <p className="icon-value">1</p>
              </div>
              <p className="delivery-text">Delivery</p>
            </div>
            <div className="payment-icon-wrapper">
              <div className="payment-icon">
                <p className="icon-value">2</p>
              </div>
              <p className="payment-text">Payment</p>
            </div>
          </div>
        ) : (
          <div className="label-text-container">
            <p>
              CURATED FOR THE SEASON OF LOVE.{" "}
              <Link to={"/product-list"} className="link">
                <span className="shop-span">SHOP </span>{" "}
                <span className="romantic-looks-span">ROMANTIC LOOKS</span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutHeader;
