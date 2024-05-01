import React, { useState, useEffect } from "react";
import "../../sass/components/cartForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../reuseable/button";

const CartForm = ({ cart }) => {
  const [estimatedShipping, setEstimatedShipping] = useState("TBD");
  const [estimatedSalesTax, setEstimatedSalesTax] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate(`/checkout-login?redirect=checkout`);
  };

  useEffect(() => {
    const subtotal = cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);

    let shippingCharges = subtotal > 5000 ? 0 : subtotal < 1 ? 0 : 5;

    shippingCharges = shippingCharges.toFixed(2);

    const tax = (subtotal * 0.05).toFixed(3);

    const calculatedTotal = (
      parseFloat(subtotal) +
      parseFloat(tax) +
      parseFloat(shippingCharges)
    ).toFixed(2);

    setEstimatedShipping(shippingCharges);
    setEstimatedSalesTax(tax);
    setEstimatedTotal(calculatedTotal);
  }, [cart]);

  return (
    <div className="cart-form">
      <div className="brand-name">
        <label>Custom Brand</label>
      </div>

      <div className="form-row">
        <label>Estimated Shipping:</label>
        <span>€{estimatedShipping}</span>
      </div>

      <div className="form-row">
        <label>Estimated Sales Tax:</label>
        <span>€{estimatedSalesTax}</span>
      </div>

      <div className="form-row">
        <label>Estimated Total:</label>
        <span>€{estimatedTotal}</span>
      </div>

      <div className="form-row">
        <PrimaryButton
          label={"Checkout"}
          type="button"
          value="checkout"
          customClasses={"start-checkout-button"}
          onClick={checkoutHandler}
        />
        {/* <Link to={"/checkout-login"} className="start-checkout-button">
          Start Checkout
        </Link> */}
      </div>
    </div>
  );
};

export default CartForm;
