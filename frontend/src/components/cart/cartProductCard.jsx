import React, { Fragment, useState } from "react";
import "../../sass/components/cartProductCard.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ConfirmationPopup from "../popupModal/popupModal";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";

const CartProductCard = ({ product }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveProduct = (stockId) => {
    setSelectedProductId(stockId);
    setShowConfirmation(true);
  };

  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };

  const handleConfirmRemove = () => {
    dispatch(removeItemsFromCart(selectedProductId));

    setShowConfirmation(false);
  };

  const handleUpdateQuantity = (
    id,
    selectedSize,
    selectedColor,
    stockId,
    quantity,
    totalQuantity
  ) => {
    if (1 > quantity) {
      return;
    }
    if (totalQuantity < quantity) {
      return;
    }
    const updatedItem = {
      id: id,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
      stockId: stockId,
      quantity: quantity,
      totalQuantity: totalQuantity,
    };
    dispatch(addItemsToCart(updatedItem));
  };

  return (
    <Fragment>
      <div className="cart-product-card">
        <div className="product-image-container">
          {product.image.includes("https") ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <img
              src={require(`../../assets/images/plp-images/${product.category}/${product.image}`)}
              alt={product.name}
              className="product-image"
            />
          )}
        </div>
        <div className="product-details">
          <p className="product-name">{product.name}</p>
          <div className="details">
            <span className="details-label">Color:</span>
            <span className="details-name">{product.selectedColor}</span>
          </div>
          <div className="details">
            <span className="details-label">Size:</span>
            <span className="details-name">{product.selectedSize}</span>
          </div>

          <div className="product-actions">
            <p className="cancel-icon">
              <AiOutlineCloseCircle
                onClick={() => handleRemoveProduct(product.stockId)}
              />
            </p>
            <div className="product-labels">
              <div className="labels-row">
                <span>Each</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              <div className="values-row">
                <span>€{product.price.toFixed(2)}</span>
                <div className="quantity-control">
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        product.productId,
                        product.selectedSize,
                        product.selectedColor,
                        product.stockId,
                        parseInt(e.target.value),
                        product.totalQuantity
                      )
                    }
                  >
                    {Array.from(
                      {
                        length: Math.min(product.totalQuantity, 10),
                      },
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <span>€{(product.price * product.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <ConfirmationPopup
          show={showConfirmation}
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
          itemName={product.name}
        />
      </div>
    </Fragment>
  );
};

export default CartProductCard;
