import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../sass/components/miniCart.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import closeIcon from "../../assets/svg/close-icon.svg";

const MiniCart = ({ handleRemoveProduct }) => {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(true);
  const [containerHeight, setContainerHeight] = useState(400);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const contentRef = useRef();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleCloseMiniCart = () => {
    setIsMiniCartOpen(false);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedItem = {
      id: item.productId,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      stockId: item.stockId,
      quantity: newQuantity,
      totalQuantity: item.totalQuantity,
    };

    dispatch(addItemsToCart(updatedItem));
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setContainerHeight(Math.min(contentHeight, 400));
    }
  }, [cartItems]);

  const checkoutHandler = () => {
    setTimeout(() => {
      navigate(`/checkout-login?redirect=checkout`);
    }, "1000");
  };

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div
      className={`mini-cart-container ${isMiniCartOpen ? "open" : "closed"}`}
    >
      {isMiniCartOpen && (
        <>
          <div className="mini-cart-header">
            <div className="title-container">
              <h2 className="your-bag">Your bag</h2>
              <div className="action-container">
                <Link to="/cart" className="view-cart-link">
                  View Cart
                </Link>
                <button className="close-button" onClick={handleCloseMiniCart}>
                  <img src={closeIcon} alt="closeIcon" className="close-item" />
                </button>
              </div>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <div
              className="content-container"
              style={{
                height: containerHeight,
                overflowY: containerHeight === 400 ? "scroll" : "hidden",
              }}
            >
              <div ref={contentRef}>
                {cartItems.map((item) => (
                  <div
                    key={item.id + item.stockId}
                    className="cart-items-conatiner"
                  >
                    <div className="cart-item">
                      <div className="image-conatiner">
                        <div className="brand-image-conatiner">
                          <Link
                            to={`/product-detail/${item.productId}`}
                            className="item-link"
                          >
                            {item.image.includes("https") ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="item-image"
                              />
                            ) : (
                              <img
                                src={require(`../../assets/images/plp-images/${item.category}/${item.image}`)}
                                alt={item.name}
                                className="item-image"
                              />
                            )}
                          </Link>
                        </div>
                      </div>
                      <div className="item-details-container">
                        <Link
                          to={`/product-detail/${item.productId}`}
                          className="itemLink"
                        >
                          <p className="product-tile-name">{item.name}</p>
                        </Link>
                        <p className="product-detail-text">
                          Color :&nbsp;: {item.selectedColor}
                        </p>
                        <p className="product-detail-text">
                          Size :&nbsp;: {item.selectedSize}
                        </p>
                        <table className="price-table">
                          <tbody className="price-table-body">
                            <tr className="price-table-row">
                              <td className="price-table-attribute">
                                <p className="price-attribute-label">Each</p>
                              </td>
                              <td className="price-table-attribute">
                                <p className="price-attribute-label">
                                  Quantity
                                </p>
                              </td>
                              <td className="price-table-attribute">
                                <p className="price-attribute-label">Total</p>
                              </td>
                            </tr>
                            <tr className="price-table-row">
                              <td className="price-table-attribute">
                                <div className="price-column">
                                  <p className="price-text">
                                    €{item.price.toFixed(2)}
                                  </p>
                                </div>
                              </td>
                              <td className="price-table-attribute">
                                <select
                                  aria-label="Quantity"
                                  className="quantity-select"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item,
                                      parseInt(e.target.value)
                                    )
                                  }
                                >
                                  {Array.from(
                                    {
                                      length: Math.min(item.totalQuantity, 10),
                                    },
                                    (_, index) => (
                                      <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>
                              <td className="price-table-attribute">
                                <p className="price-text">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <button
                        className="remove-item-button"
                        onClick={() =>
                          handleRemoveProduct(item.stockId, item.name)
                        }
                      >
                        <img
                          src={closeIcon}
                          alt="RemoveIcon"
                          className="remove-item-icon"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="footer-container">
            <div className="total-conatiner">
              <p className="total-text">Estimated Total</p>
              <p className="total-text">€{subtotal}</p>
            </div>
            {cartItems.length > 0 && (
              <button
                className="checkoutButton start-checkout-button"
                onClick={checkoutHandler}
                type="button"
                value="checkout"
              >
                Start Checkout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
