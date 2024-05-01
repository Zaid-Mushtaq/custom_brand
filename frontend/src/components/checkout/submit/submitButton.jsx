import React, { useEffect } from "react";
import "../../../sass/components/checkout/submitButton.scss";
import { Link } from "react-router-dom";

import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { useNavigate } from "react-router";
import { clearErrors, createOrder } from "../../../actions/orderAction";
import { resetCart } from "../../../actions/cartAction";

const SubmitButton = ({ price, tax, shippingCharges, subtotal }) => {
  const paymentData = {
    amount: Math.round(price * 100),
  };

  const payBtn = useRef(null);

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const {
    shippingInfo,
    cartItems,
    billingInfo = shippingInfo,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const { error, loading } = useSelector((state) => state.newOrder);
  const navigate = useNavigate();

  const isShippingInfoValid =
    shippingInfo &&
    Object.entries(shippingInfo)
      .filter(([key, value]) => key !== "apartment")
      .every(([key, value]) => value !== "");

  const isBillingInfoValid =
    billingInfo &&
    Object.entries(billingInfo)
      .filter(([key, value]) => key !== "apartment")
      .every(([key, value]) => value !== "");

  const isPaymentButtonDisabled =
    !isShippingInfoValid ||
    !isBillingInfoValid ||
    !Object.keys(shippingInfo).length ||
    !Object.keys(billingInfo).length;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("totalQuantity::", totalQuantity);
    if (isPaymentButtonDisabled) {
      alert.error("Please fill in all shipping and billing information.");
      payBtn.current.disabled = false;
      return;
    }

    try {
      payBtn.current.disabled = true;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: shippingInfo.firstName || user.name,

            email: user.email,

            address: {
              line1: shippingInfo.completeAddress,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.countryCode,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const order = {
            shippingInfo,
            billingInfo,
            orderItems: cartItems,
            itemsPrice: subtotal,
            taxPrice: tax,
            shippingPrice: shippingCharges,
            totalPrice: price,
            totalQuantity: totalQuantity,
          };

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: result.paymentIntent.payment_method_types[0],
          };

          dispatch(createOrder(order));
        } else {
          alert.error("There is some issue while processing payment");
        }

        if (loading === false && error) {
          payBtn.current.disabled = false;

          return;
        } else if (!error) {
          setTimeout(() => {
            dispatch(resetCart());
            navigate("/thankyou");
          }, 1500);
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div className="submit-btn-container">
      <div className="btn-wrapper">
        <input
          type="submit"
          value={`Place Order`}
          ref={payBtn}
          disabled={Math.round(price) === 0 ? true : false}
          className={"submit-payment-button"}
          onClick={(e) => submitHandler(e)}
        />
      </div>
    </div>
  );
};

export default SubmitButton;
