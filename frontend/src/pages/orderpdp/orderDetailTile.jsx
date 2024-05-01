import React from "react";
import "../../sass/pages/orderDetail/OrderDetailTile.scss";
import { useSelector } from "react-redux";

const OrderDetailTile = () => {
  const { loading, myorderdetails } = useSelector(
    (state) => state.orderDetails
  );
  return (
    <div className="card order-product-summary">
      <div className="card-body">
        <div className="product-summary-block">
          <h3 className="detail-shipment-header">{"Has yet to ship"}</h3>
          {myorderdetails.orderItems &&
            myorderdetails.orderItems.map((ele) => (
              <div className="card-body" key={ele._id}>
                <div className="product-line-item">
                  <div className="col-lg-12 product-line-item-details">
                    <div className="item-image">
                      {ele.image.includes("http") ? (
                        <img
                          src={ele.image}
                          alt={ele.name}
                          className="item-images"
                        />
                      ) : (
                        <img
                          src={require(`../../assets/images/plp-images/${ele.category}/${ele.image}`)}
                          alt={ele.name}
                          className="item-images"
                        />
                      )}
                    </div>
                    <div className="item-details">
                      <div className="item-attributes">
                        <div className="line-item-header">
                          <div className="line-item-name">
                            <span>{ele.name}</span>
                          </div>
                        </div>
                        <div className="line-item-attribute">
                          <p className="line-item-attributes">
                            {"Color:"} {ele.selectedColor}
                          </p>
                          <p className="line-item-attributes">
                            {"Size: "}
                            {ele.selectedSize}
                          </p>
                        </div>
                        <div className="price-container">
                          <div className="line-item-unit-price">
                            <p className="line-item-price-info">
                              <span className="unit-price-label">{"Each"}</span>
                            </p>
                            <p className="item-price">
                              <span className="unit-price-value">
                                €{ele.price}
                              </span>
                            </p>
                          </div>
                          <div className="line-item-quantity">
                            <p className="line-item-price-info">
                              <span className="qty-card-quantity-label">
                                {"Quantity"}
                              </span>
                              <span className="qty-card-quantity-count">
                                {ele.quantity}
                              </span>
                            </p>
                          </div>
                          <div className="line-item-total-price">
                            <p className="line-item-price-info">
                              <span className="Total-price-label">
                                {"Total"}
                              </span>
                            </p>
                            <p className="item-price">
                              <span className="unit-price-value">
                                €{ele.price * ele.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailTile;
