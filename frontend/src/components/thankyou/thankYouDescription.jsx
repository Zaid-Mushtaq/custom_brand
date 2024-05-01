import React, { Fragment } from "react";
import "../../sass/components/thankyou/thankYouDecription.scss";
import { PrimaryButton } from "../reuseable/button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ThankYouDescription = () => {
  const navigate = useNavigate();
  const { shippingInfo, billingInfo } = useSelector((state) => state.cart);

  const handleContinueShopping = () => {
    navigate("/");

    window.location.reload();
  };
  return (
    <Fragment>
      {shippingInfo && (
        <div className="thankyou-shippig-billing-section">
          <div className="address-wrapper">
            <div className="shipping-address-box">
              <div className="shiping-heading-wrapper">
                <h3 className="shipping-heading">Shipping Address</h3>
              </div>
              <div className="shipping-value-wrapper">
                <p className="value-text">
                  Customer Name:{" "}
                  <span className="text-format">{shippingInfo.firstName}</span>
                </p>

                <p className="value-text">
                  Country:{" "}
                  <span className="text-format">{shippingInfo.country}</span>
                </p>
                <p className="value-text">
                  Street Address:{" "}
                  <span className="text-format">{shippingInfo.address}</span>
                </p>
                <p className="value-text">
                  Province:{" "}
                  <span className="text-format">{shippingInfo.state}</span>
                </p>
                <p className="value-text">
                  Phone Number: <span>{shippingInfo.phoneNo}</span>
                </p>
              </div>
            </div>
            <div className="billing-address-box">
              <div className="billing-heading-wrapper">
                <h3 className="billing-heading">Billing Address</h3>
              </div>
              <div className="billing-value-wrapper">
                <p className="value-text">
                  {" "}
                  Customer Name:{" "}
                  <span className="text-format">{billingInfo?.firstName}</span>
                </p>
                <p className="value-text">
                  Country:{" "}
                  <span className="text-format">{billingInfo?.country}</span>
                </p>
                <p className="value-text">
                  Street Address:{" "}
                  <span className="text-format">{billingInfo?.address}</span>
                </p>
                <p className="value-text">
                  Province:{" "}
                  <span className="text-format">{billingInfo?.state}</span>
                </p>
                <p className="value-text">
                  Phone Number: <span>{billingInfo?.phoneNo}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="continue-shopping-button-wrapper">
            <PrimaryButton
              label={"continue shopping"}
              onClick={handleContinueShopping}
              customClasses={"continue-shopping-button"}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ThankYouDescription;
