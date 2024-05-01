import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../src/sass/components/orders/orders.scss";
import Loader from "../../utils/loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import CustomSelect from "../reuseable/select";
import { useNavigate } from "react-router-dom";

const MyOrder = ({ orders }) => {
  const { loading } = useSelector((state) => state.profile);
  const allClasses = ["backToAccountLink"];
  const orderDate = new Date(orders.createdAt);
  const formattedDate = `${orderDate.getDate()}/${
    orderDate.getMonth() + 1
  }/${orderDate.getFullYear()}`;

  const multipleSelectClasses = [
    "custom-select-container",
    "custom-select-input-box",
    "selected-option-text",
    "custom-dropdown-icon",
    "custom-options-list",
    "custom-options",
  ];

  return (
    <>
      {orders && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="order-container container">
              <div className="row order-row"></div>
              <div className="row order-list-row">
                <div className="container order-list-container">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="row tile-row">
                            <div className="col-3 col-sm-2 order-image">
                              <div className="tile-image-wrapper">
                                {orders.image.includes("http") ? (
                                  <img
                                    src={orders.image}
                                    alt={orders.name}
                                    className="product-image"
                                  />
                                ) : (
                                  <img
                                    src={require(`../../assets/images/plp-images/${orders.category}/${orders.image}`)}
                                    alt={orders.name}
                                    className="product-image"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-5 col-sm-6 order-detail">
                              <div className="order-header">
                                <p className="order-no">
                                  {`Order # ${orders.orderNo}`}
                                </p>
                                <p className="purchase-chanel">
                                  {"Purchase - Web"}
                                </p>
                              </div>
                              <div className="order-details">
                                <p className="order-date">
                                  {"Date Ordered : "}
                                  <span>{formattedDate}</span>
                                </p>
                                <p className="order-status">
                                  {"Order Status : "}
                                  <span>{`${orders.status}`}</span>
                                </p>
                                <p className="order-shipt-to">
                                  {"Ship to : "}
                                  <span>{`${orders.userName}`}</span>
                                </p>
                                <p className="order-item">
                                  {"Total items : "}
                                  <span>{`${orders.totalQuantity}`}</span>
                                </p>
                              </div>
                              <p className="total-price">
                                {"Total Price : "}
                                <span>{`€ ${orders.totalPrice}`}</span>
                              </p>
                            </div>
                            <div className="col-4 order-links">
                              <Link
                                to={`/order/${orders.orderId}`}
                                className="view-order-page"
                              >
                                {"View"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="break-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyOrder;
