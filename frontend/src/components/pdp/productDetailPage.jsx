import React, { useState, useEffect } from "react";
import "../../sass/components/pdp/productDetail.scss";
import "../../sass/components/colors/colorBox.scss";
import { useProduct } from "../../utils/ProductContext";
import ReactStars from "react-rating-stars-component";
import CustomSelect from "../reuseable/select";
import { addItemsToCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useAlert } from "react-alert";

const ProductDetailPage = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [stockId, setStockId] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const sizeValues = product.stock
    ? [...new Set(product.stock.map((item) => item.size))]
    : [];

  const colorValues = product.stock
    ? [...new Set(product.stock.map((item) => item.color))]
    : [];

  useEffect(() => {
    if (colorValues.length > 0 && selectedColor === null) {
      setSelectedColor(colorValues[0]);
    }

    if (selectedColor && selectedSize) {
      const matchingStock = product.stock.find(
        (item) => item.color === selectedColor && item.size === selectedSize
      );

      if (matchingStock) {
        const newQuantityOptions = Array.from(
          { length: matchingStock.quantity },
          (_, index) => {
            const quantity = index + 1;
            return { value: quantity.toString(), label: quantity };
          }
        );
        setQuantityOptions(newQuantityOptions);
        setStockId(matchingStock._id);
      } else {
        setQuantityOptions([]);
      }
    } else {
      setQuantityOptions([]);
    }
  }, [selectedColor, selectedSize, selectedQuantity, product.stock]);

  const isAddToCartDisabled =
    !selectedColor ||
    !selectedSize ||
    quantityOptions.length === 0 ||
    !selectedQuantity;

  const handleColorClick = (color, event) => {
    event.preventDefault();
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleSizeChange = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (isAddToCartDisabled) {
      alert.error("Please select color, size, and quantity");
      return;
    }
    const selectedQuantityValue = parseInt(selectedQuantity, 10);
    const matchingStock = product.stock.find((item) => item._id === stockId);

    if (matchingStock && matchingStock.quantity !== undefined) {
      const totalQuantity = matchingStock.quantity;

      const updatedItem = {
        id: id,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        stockId: stockId,
        quantity: selectedQuantityValue,
        totalQuantity: totalQuantity,
      };

      console.log("id:", id);

      console.log("selectedSize:", selectedSize);
      console.log("selectedColor:", selectedColor);
      console.log("stockId:", stockId);
      console.log("quantity:", selectedQuantityValue);
      console.log("totalQuantity:", totalQuantity);

      dispatch(addItemsToCart(updatedItem));
      alert.success("Item Added to Cart");
    }

    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedQuantity("");
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  const multipleSelectClasses = [
    "custom-select-container",
    "custom-select-label",
    "custom-select-input-box",
    "selected-option-text",
    "custom-dropdown-icon",
    "custom-options-list",
    "custom-options",
  ];

  return (
    <div className="product-detail">
      <h1 className="product-detail-heading">{product?.name}</h1>
      <div className="product-prices">
        <div className="product-price">
          <span className="current-price">€{product?.price}</span>
          <span className="tax-label">Tax excluded</span>
        </div>
        <div className="tax-shipping-delivery-label">
          <span className="delivery-information">Delivery: 1 to 3 weeks</span>
        </div>
      </div>
      <div className="product-description">
        <p>{product?.description}</p>
      </div>
      <div className="product-action">
        <form onSubmit={handleAddToCart}>
          <div className="product-variants">
            <div className="product-variants-items">
              <div className="color-lable-container">
                <span className="color-label">Color</span>
              </div>
              <div className="select-color-container">
                {colorValues &&
                  colorValues.map((color, index) => (
                    <button
                      key={index}
                      className={`color-button ${color.toLowerCase()} ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      onClick={(event) => handleColorClick(color, event)}
                    ></button>
                  ))}
              </div>
            </div>
            <div className="product-variants-item">
              {sizeValues ? (
                <>
                  <div className="size-lable-container">
                    <span className="size-label">Size</span>
                  </div>
                  <div className="select-size-container">
                    {sizeValues.map((size, index) => (
                      <div key={index} className="TextSelectorButtonWrapper">
                        <button
                          className={`product-button-size ${
                            selectedSize === size ? "selected" : ""
                          }`}
                          title=""
                          type="button"
                          onClick={() => handleSizeChange(size)}
                        >
                          {size}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <span className="normal-span">No sizes available</span>
              )}
            </div>
            {quantityOptions.length > 0 ? (
              <CustomSelect
                labelFor="selectQuantityInput"
                label="Qty"
                placeholder="Qty"
                options={
                  quantityOptions.length > 10
                    ? quantityOptions.slice(0, 10)
                    : quantityOptions
                }
                classes={multipleSelectClasses}
                setSelectedQuantity={setSelectedQuantity}
                withLabel={true}
              />
            ) : (
              <span className="no-item">Out of Stock</span>
            )}
            <div className="product-item-review">
              <div className="review-label-container">
                <span className="review-label">Review</span>
              </div>
              <div className="d-flex align-content-center justify-content-center product-star">
                {product.ratings ? (
                  <ReactStars
                    {...options}
                    value={product.ratings}
                    className="fas fa-star"
                  />
                ) : (
                  <span>No reviews available</span>
                )}
              </div>
            </div>

            <div className="break-line"></div>
            <div className="product-add-to-cart">
              <button
                className="add-to-cart"
                type="submit"
                disabled={isAddToCartDisabled}
              >
                ADD TO BAG
              </button>
            </div>
            <div className="break-line"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailPage;
