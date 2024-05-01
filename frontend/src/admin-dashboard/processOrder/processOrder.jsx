import React, { Fragment, useState, useEffect } from "react";
import "../../sass/admindashboard/processOrder/processOrder.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import { Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import Loader from "../../utils/loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const { myorderdetails, error, loading } = useSelector(
    (state) => state.orderDetails
  );

  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const getDeliveredDate =
    myorderdetails &&
    myorderdetails.deliveredAt &&
    new Date(myorderdetails.deliveredAt).toLocaleDateString("en-GB");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  // Process Order Handler
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard-main-container">
        <div className="row header-container-fluid">
          <div className="col-12">
            <AdminPanelHeader />
          </div>
        </div>
        <div className="main-dashboard-content">
          <Sidebar />
          {loading ? (
            <Loader />
          ) : (
            <div
              className="processOrderContainer"
              style={{
                display:
                  myorderdetails.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="processOrder-custom-row">
                <div className="processOrderLeftContainer">
                  <div className="confirmProcessShippingArea">
                    <Typography className="main-head">Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                      <div>
                        <p>Name:</p>
                        <span>
                          {myorderdetails &&
                            myorderdetails.billingInfo &&
                            myorderdetails.billingInfo.firstName}
                        </span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {myorderdetails &&
                            myorderdetails.billingInfo &&
                            myorderdetails.billingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {myorderdetails &&
                            myorderdetails.billingInfo &&
                            `${myorderdetails.billingInfo.address}, ${myorderdetails.billingInfo.city}, ${myorderdetails.billingInfo.state}, ${myorderdetails.billingInfo.pinCode}, ${myorderdetails.billingInfo.country}`}
                        </span>
                      </div>
                    </div>

                    <Typography className="main-head">Payment</Typography>
                    <div className="orderDetailsBoxContainer">
                      <div className="order-info">
                        <p
                          className={
                            myorderdetails &&
                            myorderdetails.paymentInfo &&
                            myorderdetails.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {myorderdetails &&
                          myorderdetails.paymentInfo &&
                          myorderdetails.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div className="order-price">
                        <p>Amount:</p>
                        <span>
                          {myorderdetails && `€${myorderdetails.totalPrice} `}
                        </span>
                      </div>
                    </div>

                    <Typography className="main-head">Order Status</Typography>
                    <div className="orderDetailsBoxContainer">
                      <div className="order-status-info">
                        <p
                          className={
                            myorderdetails &&
                            myorderdetails.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {myorderdetails && myorderdetails.orderStatus}
                        </p>
                        {myorderdetails &&
                          myorderdetails.orderStatus === "Delivered" && (
                            <p
                              className={
                                myorderdetails &&
                                myorderdetails.orderStatus === "Delivered"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {myorderdetails && getDeliveredDate}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="confirmCartItems">
                      <Typography className="main-head">
                        Your Cart Items:
                      </Typography>
                      <div className="confirmCartItemsContainer">
                        {myorderdetails &&
                          myorderdetails.orderItems &&
                          myorderdetails.orderItems.map((item) => (
                            <div key={item.productId}>
                              {item.image.includes("https") ? (
                                <img
                                  src={item.image}
                                  alt={`item-${item.productId}`}
                                />
                              ) : (
                                <img
                                  src={require(`../../assets/images/plp-images/${item.category}/${item.image}`)}
                                  alt={`item-${item.productId}`}
                                />
                              )}
                              <Link tp={`/product/${item.productId}`}>
                                {item.name}
                              </Link>
                              <span>
                                {item.quantity} &#215; €{item.price}={" "}
                                <b>€{item.price * item.quantity}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div
                  className="processOrderRightContainer"
                  style={{
                    display:
                      myorderdetails.orderStatus === "Delivered"
                        ? "none"
                        : "block",
                  }}
                >
                  <form
                    className="orderSummaryProcess"
                    encType="multipart/form-data"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <Typography className="summary-para">
                      Process Order
                    </Typography>

                    <div className="processOrder-payment">
                      <AccountTreeIcon />
                      <select
                        className="processOrderSelectField"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose Order Status</option>
                        {myorderdetails &&
                          myorderdetails.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                        {myorderdetails &&
                          myorderdetails.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                      </select>
                    </div>

                    <Button
                      id="Btn"
                      type={"submit"}
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
