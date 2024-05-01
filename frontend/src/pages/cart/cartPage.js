import React, { useState } from "react";
import "../../sass/pages/cart/cartPage.scss";
import CartProductCard from "../../components/cart/cartProductCard";
import { Link } from "react-router-dom";
import CartForm from "../../components/cart/cartForm";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <div className="container cart-container">
      <div className="cart-page">
        <div className="product-bag">
          <h1 className="bag-head">My Bag</h1>
          <div className="top-section">
            <Link to="/product-list/men" className="continue-shopping">
              &#60; Continue Shopping
            </Link>
            <span className="item-count">{totalItems} Items</span>
          </div>
          {cartItems && cartItems.length < 1 ? (
            <div className="empty-cart">
              <h1 className="empty-cart-head">Your Cart</h1>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="row cart-detail-container">
              <div className="col-12 col-md-6 product-bag">
                {cartItems.map((item) => (
                  <CartProductCard key={item.productId} product={item} />
                ))}
              </div>
              <div className="col-12 col-md-6 cart-summary">
                <CartForm cart={cartItems} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
