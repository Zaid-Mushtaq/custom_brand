import React, { Fragment } from "react";
import "../../sass/pages/checkout/checkout.scss";
import PaymentInfo from "../../components/checkout/payment/paymentInfo";
import BillingAddress from "../../components/checkout/billing/billingAddress";
import ShippingAddress from "../../components/checkout/shipping/shippingAddress";
import SubmitButton from "../../components/checkout/submit/submitButton";
import CheckoutOrderSummary from "../../components/checkout/orderSummary/checkoutOrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { saveShippingInfo } from "../../actions/cartAction";
import Loader from "../../utils/loader";

const Checkout = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.user);

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  let shippingCharges = subtotal === "0.000" ? 0 : subtotal < 1 ? 0 : 5;
  shippingCharges = shippingCharges.toFixed(2);
  const tax = (subtotal * 0.05).toFixed(2);

  const totalPrice = (
    parseFloat(subtotal) +
    parseFloat(tax) +
    parseFloat(shippingCharges)
  ).toFixed(2);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid checkout-page">
          <div className="container">
            <div className="row">
              <div className="__checkout-custom-row">
                <div className="checkout-left">
                  <div className="checkout-info-container">
                    <ShippingAddress shippingInfo={shippingInfo} />
                    <PaymentInfo />
                    <BillingAddress />
                    <SubmitButton
                      price={totalPrice}
                      tax={tax}
                      shippingCharges={shippingCharges}
                      subtotal={subtotal}
                    />
                  </div>
                </div>
                <div className="order-summary-wrapper">
                  <CheckoutOrderSummary
                    subtotal={subtotal}
                    shippingCharges={shippingCharges}
                    totalPrice={totalPrice}
                    tax={tax}
                    cartItems={cartItems && cartItems.length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Checkout;
