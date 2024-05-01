import React, { useState, useEffect } from "react";
import "../../sass/components/productTile/productTile.scss";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductSlider from "../slider";
import SelectedColor from "./selectedColor";
import SelectedSize from "./selectedSize";
import { useIntl } from "react-intl";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";

const ProductTile = ({ productsData }) => {
  const navigate = useNavigate();
  const [selectIndex, setSelectedIndex] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const [stockInfo, setStockInfo] = useState({ stockId: "", quantity: 0 });
  const alert = useAlert();
  const dispatch = useDispatch();
  const intl = useIntl();

  const { cartItems } = useSelector((state) => state.cart);
  const handleIndex = (num) => {
    setSelectedIndex(num);
  };

  useEffect(() => {
    if (productsData.length > 0) {
      const selectedSizeKeys = Object.keys(selectedSizes);
      const specificProduct = productsData.find(
        (product) => product._id === selectedSizeKeys[0]
      );

      if (specificProduct) {
        const selectedStock = specificProduct.stock.find(
          (item) =>
            item.size === selectedSizes[specificProduct._id] &&
            item.color === selectedColor[specificProduct._id]
        );

        if (selectedStock) {
          const { _id: stockId, quantity } = selectedStock;
          setStockInfo({ stockId, quantity });
        } else {
          // Handle case where selected stock is not found
          setStockInfo({ stockId: "", quantity: 0 });
        }
      } else {
        // Handle case where specific product is not found
        setStockInfo({ stockId: "", quantity: 0 });
      }
    }
  }, [productsData, selectedSizes, selectedColor]);

  const resetSelection = () => {
    setSelectedSizes({});
    setSelectedColor({});
    setSelectedProduct(null);
    setSelectedProductID(null);
  };

  const handleSelectionChange = (productId, attribute, value, product) => {
    resetSelection();

    setLoadingStates((prevStates) => ({
      ...prevStates,
      [productId]: {
        ...prevStates[productId],
        [attribute === "colors" ? "mainImage" : "sliderImages"]: true,
      },
    }));
    setSelectedProduct(product);

    setTimeout(() => {
      if (attribute === "size") {
        setSelectedSizes((prevSizes) => ({
          ...prevSizes,
          [productId]: value,
        }));
      } else if (attribute === "colors") {
        setSelectedSizes((prevSizes) => ({
          ...prevSizes,
          [productId]: null,
        }));

        setSelectedColor((prevColors) => ({
          ...prevColors,
          [productId]: value,
        }));
        setSelectedProductID(productId);
      }

      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: {
          ...prevStates[productId],
          [attribute === "colors" ? "mainImage" : "sliderImages"]: false,
        },
      }));
    }, 3000);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleSliderImageLoad = (productId, imgIndex) => {
    if (loadingStates[productId]) {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [productId]: {
          ...prevStates[productId],
          sliderImages: prevStates[productId].sliderImages.map((state, index) =>
            index === imgIndex ? false : state
          ),
        },
      }));
    }
  };

  const handleAddToCart = (product) => {
    if (selectedSizes[product._id] && selectedColor[product._id]) {
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [product._Id]: {
          ...prevStates[product._Id],
          mainImage: true,
        },
      }));
      let updatedQuantity = 1;
      const ExistingProduct =
        cartItems &&
        cartItems.find(
          (item) =>
            item.productId === product._id && item.stockId === stockInfo.stockId
        );

      if (ExistingProduct) {
        console.log(ExistingProduct);
        updatedQuantity = ExistingProduct.quantity + 1;
      }
      if (stockInfo.quantity < 1) {
        alert.error("This product is currently out of stock.");
        return;
      }

      if (updatedQuantity > stockInfo.quantity) {
        alert.error("The selected quantity exceeds the available stock.");
        return;
      }
      const updatedItem = {
        id: product._id,
        selectedSize: selectedSizes[product._id],
        selectedColor: selectedColor[product._id],
        stockId: stockInfo.stockId,
        quantity: updatedQuantity,
        totalQuantity: stockInfo.quantity,
      };

      dispatch(addItemsToCart(updatedItem));
      alert.success("Item Added to Cart");

      setSelectedSizes((prevSizes) => ({
        ...prevSizes,
        [product._id]: null,
      }));

      setSelectedColor((prevColors) => ({
        ...prevColors,
        [product._id]: null,
      }));

      setTimeout(() => {
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [product._Id]: {
            ...prevStates[product._Id],
            mainImage: true,
          },
        }));
      }, 1000);
    } else {
      alert.error("Please select size and color before adding to the cart!");
    }
  };

  const handleProductTileClick = (product, event) => {
    event.preventDefault();

    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [selectedProductID]: null,
    }));
    setSelectedColor((prevColors) => ({
      ...prevColors,
      [selectedProductID]: null,
    }));

    setSelectedProduct(product);
    setSelectedProductID(product._id);

    navigate(`/product-detail/${product.category}/${product._id}`);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "goldenrod",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <>
      <div className="row">
        {productsData.map((product) => (
          <div
            key={product._id}
            className="col-12 col-md-6 col-xl-3 d-flex flex-column align-items-center justify-content-center product-item my-3"
          >
            <div
              className={`product ${
                loadingStates[product._id]?.mainImage ? "selectionLoader" : ""
              }`}
              style={{ width: "100%" }}
            >
              {loadingStates[product._id]?.mainImage && (
                <div className="loader"></div>
              )}
              <Link to={`/product-detail/${product._id}`}>
                <div className="plp-image-wrapper">
                  {product.images.length > 1 ? (
                    <ProductSlider
                      product={product}
                      handleSliderImageLoad={handleSliderImageLoad}
                      handleProductTileClick={handleProductTileClick}
                      loadingStates={loadingStates}
                      handleIndex={handleIndex}
                    />
                  ) : product.images[0].url.includes("https") ? (
                    <img
                      src={product.images[0].url}
                      alt={`${product._id}`}
                      onLoad={() => handleSliderImageLoad(product._id, 0)}
                      onClick={() => handleIndex(product._id)}
                    />
                  ) : (
                    <img
                      src={require(`../../assets/images/plp-images/${product.category}/${product.images[0].url}`)}
                      alt={`${product._id}`}
                      onLoad={() => handleSliderImageLoad(product._id, 0)}
                      onClick={() => handleIndex(product._id)}
                    />
                  )}
                </div>
              </Link>

              <div className="icon-heart">
                <FaHeart className="icon" />
              </div>
              <div className={`tag bg-${product.tag}`}>{product.tag}</div>

              <div className="products-details-container">
                <div className="product-title-container">
                  <p className="title">{product.name}</p>
                  <p className="price">
                    {intl.formatMessage({ id: "price.text" })}
                    <span> €{product.price.toFixed(2)}</span>
                  </p>
                  <div>
                    {product.ratings && (
                      <ReactStars
                        {...options}
                        value={product.ratings}
                        className="fas fa-star"
                      />
                    )}
                  </div>
                </div>

                <div className="products-details-container-hidden">
                  <SelectedColor
                    product={product}
                    handleSelectionChange={handleSelectionChange}
                    selectedColor={selectedColor}
                  />
                  {selectedProductID === product._id && (
                    <SelectedSize
                      key={selectedProductID}
                      product={selectedProduct}
                      selectedSizes={selectedSizes}
                      handleSizeChange={handleSizeChange}
                      selectedColor={selectedColor}
                      selectedProductID={selectedProductID}
                      setSelectedProductID={setSelectedProductID}
                    />
                  )}

                  <div className="add-to-cart-btn-container">
                    {selectedSizes[product._id] &&
                    selectedColor[product._id] ? (
                      stockInfo.quantity < 1 ? (
                        <p className="out-of-stock-text">Out of Stock</p>
                      ) : (
                        <button
                          className="btn selected"
                          onClick={() => handleAddToCart(product)}
                        >
                          {intl.formatMessage({ id: "addToCart.text" })}
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTile;
//Usama
