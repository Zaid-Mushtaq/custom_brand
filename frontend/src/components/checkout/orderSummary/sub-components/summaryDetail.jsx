import React from "react";
import { useSelector } from "react-redux";
import "../../../../sass/components/checkout/summaryDetail.scss";
import CustomParagraph from "./paragrah";
import SummaryTile from "./summaryTile";

const SummaryDetail = ({ subtotal, shippingCharges, totalPrice, tax }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="summary-container">
      <h2 className="summary-heading d-none d-md-block">Order Summary</h2>
      <div className="summary-details">
        <div className="sub-total-container">
          <CustomParagraph text={"Subtotal"} customClass={"subtotal-text"} />
          <CustomParagraph
            text={`€${subtotal}`}
            customClass={"subtotal-value"}
          />
        </div>
        <div className="shipping-text-container">
          <CustomParagraph text={"Shipping"} customClass={"shiping-text"} />
          <CustomParagraph
            text={`€${shippingCharges}`}
            customClass={"shiping-value"}
          />
        </div>
        <div className="taxes-container">
          <CustomParagraph text={"Taxes"} customClass={"taxes-text"} />
          <CustomParagraph text={`€${tax}`} customClass={"taxes-value"} />
        </div>
        <div className="your-total-container _total">
          <CustomParagraph
            text={"Your Total"}
            customClass={"your-total-text"}
          />
          <CustomParagraph
            text={`€${totalPrice}`}
            customClass={"your-total-value"}
          />
        </div>
      </div>
      <div className="your-bag-section">
        <h2 className="your-bag-heading">Your Bag</h2>

        <SummaryTile tiles={cartItems} />
      </div>
    </div>
  );
};

export default SummaryDetail;
