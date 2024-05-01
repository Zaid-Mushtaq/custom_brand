import React, { useEffect } from "react";
import MyOrder from "../../components/orders/myOrder";
import "../../sass/pages/orders/order.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useState } from "react";
import UserDetail from "../../components/account/userProfile/sub-components/userDetail";
import Loader from "../../utils/loader";

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (orders) {
      const newAllOrders = [];
      orders.forEach((ele) => {
        let itemToUnshift;
        if (ele.orderItems.length > 1) {
          itemToUnshift = ele.orderItems[1];
        } else if (ele.orderItems.length === 1) {
          itemToUnshift = ele.orderItems[0];
        }
        if (itemToUnshift) {
          itemToUnshift.orderId = ele._id;
          itemToUnshift.orderNo = ele.orderNo;
          itemToUnshift.status = ele.orderStatus;
          itemToUnshift.totalPrice = ele.totalPrice;
          itemToUnshift.userName = ele.billingInfo.firstName;
          itemToUnshift.totalQuantity = ele.totalQuantity;
          newAllOrders.unshift(itemToUnshift);
        }
      });
      setAllOrders(newAllOrders);
    }
  }, [orders]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid orders-page">
          <div className="order-history-title-conatiner">
            <p className="order-history-heading">{"Order History"}</p>
          </div>
          {allOrders &&
            allOrders.map((ele, ind) => <MyOrder orders={ele} key={ind} />)}
          <div className="myAccount-link-container">
            <UserDetail backToAccountLink={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
