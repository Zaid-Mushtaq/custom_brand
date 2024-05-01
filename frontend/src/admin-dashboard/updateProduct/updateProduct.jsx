import React, { Fragment, useEffect, useState } from "react";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router";
import { PrimaryButton } from "../../components/reuseable/button";
import EuroIcon from "@material-ui/icons/Euro";
import SubCategoryIcon from "@material-ui/icons/Category";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "../../sass/admindashboard/updateProduct.scss";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const { error, product } = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [tagName, setTagName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState([{ size: "", color: "", quantity: null }]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const categories = ["men", "women", "kids"];
  const subCategories = [
    "jackets",
    "sweaters",
    "socks",
    "pants",
    "jeans",
    "gloves",
    "hats",
    "shirts",
    "coats",
    "dresses",
    "skirts",
    "shoes",
    "shorts",
  ];

  // Predefined options for color and size
  const colors = [
    "Blue",
    "Red",
    "Green",
    "Black",
    "Yellow",
    "Orange",
    "Green",
    "Skyblue",
    "Maroon",
  ];
  const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setTagName(product.tag);
      setCategory(product.category);
      setSubCategory(product.subCategory);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("subCategory", subCategory);
    myForm.set("tag", tagName);
    // Merge stock items with the same color and size
    const mergedStock = {};
    stock.forEach((item) => {
      const key = `${item.color}-${item.size}`;
      if (key in mergedStock) {
        mergedStock[key].quantity += +item.quantity;
      } else {
        mergedStock[key] = { ...item };
      }
    });

    // Convert merged stock object back to array
    const mergedStockArray = Object.values(mergedStock);
    myForm.append("stock", JSON.stringify(mergedStockArray));

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleStockChange = (index, key, value) => {
    const updatedStock = [...stock];
    updatedStock[index][key] = value;
    setStock(updatedStock);
  };

  const addStockItem = () => {
    const lastItem = stock[stock.length - 1];
    if (lastItem.size && lastItem.color && lastItem.quantity) {
      setStock([...stock, { size: "", color: "", quantity: null }]);
    }
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
          <div className="updateProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 id="newProductHeading">Update Product</h1>
              <div className="product-content">
                <SpellcheckIcon />
                <input
                  className="create-product-input-data"
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="product-content">
                <EuroIcon />
                <input
                  className="create-product-input-data"
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="product-content">
                <LocalOfferIcon />
                <input
                  className="create-product-input-data"
                  type="text"
                  placeholder="Enter Tag Name"
                  required
                  onChange={(e) => setTagName(e.target.value)}
                  value={tagName}
                />
              </div>

              <div className="product-content">
                <DescriptionIcon />
                <textarea
                  className="product-text-field"
                  type="text"
                  placeholder="Product Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>

              <div className="product-content">
                <AccountTreeIcon />
                <select
                  className="product-select-field"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option>Chooste Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="product-content">
                <SubCategoryIcon />
                <select
                  className="product-select-field"
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                >
                  <option>Choose SubCategory</option>
                  {subCategories.map((subcate) => (
                    <option key={subcate} value={subcate}>
                      {subcate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Render stock input fields dynamically */}
              {stock.map((item, index) => (
                <div key={index} className="product-content-stock">
                  <div className="stock-content-conatiner">
                    <FormatSizeIcon />
                    <select
                      className="product-stock-fields"
                      value={item.size}
                      onChange={(e) =>
                        handleStockChange(index, "size", e.target.value)
                      }
                    >
                      <option value="">Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="stock-content-conatiner">
                    <ColorLensIcon />
                    <select
                      className="product-stock-fields"
                      type="string"
                      value={
                        item.color.charAt(0).toUpperCase() +
                        item.color.slice(1).toLowerCase()
                      }
                      onChange={(e) =>
                        handleStockChange(index, "color", e.target.value)
                      }
                    >
                      <option value="">Color</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color.charAt(0).toUpperCase() +
                            color.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="stock-content-conatiner">
                    <StorageIcon />
                    <input
                      className="product-stock-fields"
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleStockChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <PrimaryButton
                label={"Add More Stock"}
                onClick={addStockItem}
                customClasses={"create-product-stock"}
              />
              <div className="product-content" id="createProductFormFile">
                <input
                  type="file"
                  name="ecommerce"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt=" Old Product Preview"
                    />
                  ))}
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update Product
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
