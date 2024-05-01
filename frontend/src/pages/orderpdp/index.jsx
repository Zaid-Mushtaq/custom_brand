import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../../sass/pages/orderDetail/orderdetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../../utils/loader";
import { useEffect } from "react";
import OrderDetailTile from "./orderDetailTile";
import UserDetail from "../../components/account/userProfile/sub-components/userDetail";

const OrderDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const { myorderdetails, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, useParams]);

  const maskCardNumber = (cardNumber) => {
    const maskedNumber =
      "*".repeat(cardNumber.length - 3) + cardNumber.slice(-3);
    return maskedNumber;
  };

  const cardNumber = "4000002760003184";
  const maskedCardNumber = maskCardNumber(cardNumber);

  const expirationDate = "3/2030";

  const getDeliveredDate =
    myorderdetails &&
    myorderdetails.deliveredAt &&
    new Date(myorderdetails.deliveredAt).toLocaleDateString("en-GB");

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {" "}
          <div className="order-detail-page">
            <div className="order-history-title-conatiner">
              <p className="order-history-heading">{"Order Detail"}</p>
            </div>
            <div className="container receipt">
              <div className="row receipt-row">
                <div className="col-sm-8 col-md-6 col-lg-4 receipt-main">
                  <div className="card confirm-detail">
                    <div className="card-header">
                      <h2 className="card-header-custom">Receipt</h2>
                      <span className="order-no">
                        Order # {myorderdetails.orderNo}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="single-shipping">
                        <div className="summary-details">
                          <div className="address-summary">
                            <div className="customer-name">
                              <span className="first-name">
                                {myorderdetails.user &&
                                  myorderdetails.user.name}
                              </span>
                              {myorderdetails.user && (
                                <span className="last-name">
                                  {myorderdetails.user.lastname}
                                </span>
                              )}
                            </div>
                            <div className="address">
                              {myorderdetails.shippingInfo &&
                                myorderdetails.shippingInfo.address}
                            </div>
                            <div className="city-state-country-posatl">
                              <span className="city">
                                {myorderdetails.shippingInfo &&
                                  myorderdetails.shippingInfo.city}
                              </span>
                              <span className="state-code">
                                {myorderdetails.shippingInfo &&
                                  myorderdetails.shippingInfo.pinCode}
                              </span>
                              <span className="country">
                                {myorderdetails.shippingInfo &&
                                  myorderdetails.shippingInfo.country}
                              </span>
                              <span className="postal-code">
                                {myorderdetails.shippingInfo &&
                                  myorderdetails.shippingInfo.pinCode}
                              </span>
                            </div>
                            <span className="order-summary-phone">
                              {myorderdetails.shippingInfo &&
                                myorderdetails.shippingInfo.phoneNo}
                            </span>
                          </div>
                        </div>
                        {myorderdetails &&
                          myorderdetails.orderStatus != "Delivered" && (
                            <div className="row summary-details">
                              <div className="start-lines">
                                <p className="shipping-method">
                                  <span className="shipping-method-title">
                                    {"Ordered Delivered"}
                                  </span>
                                  <span className="shipping-method-arrival-time">
                                    {"( 3 - 7 Business Days )"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        <div className="row status-detail">
                          <h3 className="order-status-head">Status</h3>
                          <div className="status-info">
                            <p className="orderstatus">
                              <span
                                className={`order-status-title ${
                                  myorderdetails.orderStatus === "Delivered"
                                    ? "greenColor"
                                    : "redColor"
                                } `}
                              >
                                {myorderdetails && myorderdetails.orderStatus}
                              </span>
                              {myorderdetails.orderStatus === "Delivered" && (
                                <span className={`order-delivered`}>
                                  {myorderdetails && getDeliveredDate}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <span className="summary-section-label">
                          {"Billing Address"}
                        </span>
                        <div className="address-summary billing">
                          <div className="customer-name">
                            <span className="first-name">
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.firstName}
                            </span>
                            <span className="last-name">
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.lastName}
                            </span>
                          </div>
                          <div className="address">
                            {myorderdetails.billingInfo &&
                              myorderdetails.billingInfo.address}
                          </div>
                          <div className="city-state-country-posatl">
                            <span className="city">
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.city}
                            </span>
                            <span className="state-code">
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.pinCode}
                            </span>
                            <span className="country">
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.country}
                            </span>
                            <span className="postal-code">
                              {" "}
                              {myorderdetails.billingInfo &&
                                myorderdetails.billingInfo.pinCode}
                            </span>
                          </div>
                          <span className="order-summary-phone">
                            {myorderdetails.billingInfo &&
                              myorderdetails.billingInfo.phoneNo}
                          </span>
                        </div>
                        <div className="summary-details payment">
                          <span className="summary-section-label">
                            {"Payment"}
                          </span>
                          <div className="payment-details">
                            <div className="credit-card-type">
                              <span>
                                {myorderdetails.paymentInfo &&
                                  myorderdetails.paymentInfo.type}
                              </span>
                            </div>
                            <div className="credit-card-number">
                              {maskedCardNumber}
                            </div>
                            <div className="credit-card-expiration-date">
                              <span>Ending: {expirationDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <OrderDetailTile />
                  <div className="card checkout-order-total-summary">
                    <div className="card-body order-total-summary">
                      <div className="row subtotal-item">
                        <div className="col-6 start-lines">
                          <p className="order-receipt-label">
                            <span>
                              Subtotal ({myorderdetails.totalQuantity} items)
                            </span>
                          </p>
                        </div>
                        <div className="col-6 end-lines">
                          <p className="text-right">
                            <span className="sub-total">
                              €{myorderdetails.itemsPrice}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/*end code for if we have discount on order */}
                      <div className="row shipping-item">
                        <div className="col-6 start-line">
                          <p className="shipping-receipt-label">
                            <span>{"Shipping"}</span>
                          </p>
                        </div>
                        <div className="col-6 end-lines">
                          <p className="text-right">
                            <span className="shipping-total-cost">
                              €{myorderdetails.shippingPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="row sales-tax-item">
                        <div className="col-6 start-line">
                          <p className="shipping-receipt-label">
                            <span>{"Sales Tax"}</span>
                          </p>
                        </div>
                        <div className="col-6 end-lines">
                          <p className="text-right">
                            <span className="tax-total">
                              €{myorderdetails.taxPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="row grand-total">
                        <div className="col-6 start-line">
                          <p className="shipping-receipt-label">
                            <span>{"Total"}</span>
                          </p>
                        </div>
                        <div className="col-6 end-lines">
                          <p className="text-right">
                            <span className="tax-total">
                              €{myorderdetails.totalPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="myAccount-link-container">
                    <UserDetail backToOrderHistoryLink={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
