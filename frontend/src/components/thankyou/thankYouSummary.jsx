import React, { useState, useEffect } from "react";
import "../../sass/components/thankyou/thankYouSummary.scss";
import SummaryTile from "../checkout/orderSummary/sub-components/summaryTile";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ThankYouSummary = ({ order }) => {
  const [subtotal, setSubtotal] = useState(0);

  const shippingCost = 120;

  // useEffect(() => {
  //   const newSubtotal = order.order.reduce((acc, tile) => {
  //     return acc + tile.price * tile.stock[0].quantity;
  //   }, 0);

  //   setSubtotal(newSubtotal);
  // }, [tiles]);

  return (
    <div className="thankyou-summary-container">
      <div className="order-tile-section">
        <div className="order-tile">
          {order && (
            <SummaryTile
              thankYouProps={true}
              tiles={order ? [...order.order.orderItems] : ""}
            />
          )}
        </div>
        <div className="__quantity-container">
          <div className="quantity-tile">
            {order &&
              order.order.orderItems.map((tile) => (
                <div
                  key={tile._id}
                  className="order-tile-quantity-price-wrapper"
                >
                  <div className="quantity-wrapper">
                    <p className="quantity-text">
                      <span>Qty:</span>
                      <span>{tile.quantity}</span>
                    </p>
                  </div>
                  <div className="price-wrapper">
                    <p className="price-text">
                      <span>
                        {order ? "€" : ""}
                        {(tile.price * tile.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="devider" />
      <div className="order-total-section">
        <div className="order-total-container">
          <div className="__common-container subtotal-container">
            <p className="_common-text subtotal-text">
              <span>SubTotal</span>
              <span>
                {order ? "€" : ""}
                {order ? order.order.itemsPrice.toFixed(2) : ""}
              </span>
            </p>
          </div>

          <div className="__common-container shipping-container">
            <p className="_common-text shipping-text">
              <span>Shipping</span>
              <span>
                {order ? "€" : ""}
                {order ? order.order.shippingPrice.toFixed(2) : ""}
              </span>
            </p>
          </div>
          <div className="__common-container shipping-container">
            <p className="_common-text product-text">
              <span>Tax</span>
              <span>
                {order ? "€" : ""}
                {order ? order.order.taxPrice.toFixed(2) : ""}
              </span>
            </p>
          </div>
          <div className="__devider" />
          <div className="__common-container total-container">
            <p className="_common-text total-text">
              <span>Total</span>
              <span>
                {order ? "€" : ""} {order && order.order.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouSummary;
