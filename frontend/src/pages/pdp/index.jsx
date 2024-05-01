import React, { useState, useEffect, Fragment } from "react";
import "../../sass/pages/pdp/product-detail.scss";
import ProductDetailSlider from "../../components/pdp/productDetailSlider";
import ProductDetailPage from "../../components/pdp/productDetailPage";
import Breadcrumb from "../../components/breadcrumb";
import SuggestedProduct from "../../components/pdp/suggestedProduct";
import RelatedProducts from "../../components/pdp/relatedProduct";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  getProduct,
} from "../../actions/productAction";
import Loader from "../../utils/loader";
import { useAlert } from "react-alert";
import { useLocation, useParams } from "react-router";

const ProductDetail = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [suggestionProduct, setSuggestionProducts] = useState();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { products } = useSelector((state) => state.homeProducts);

  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    console.log("USePArams", id);
    console.log("Product", product.category);

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    let category = product.category;
    dispatch(getProductDetails(id));
    dispatch(getProduct(category));
  }, [dispatch, error, alert, id]);

  useEffect(() => {
    if (products && products.length > 0) {
      const suggestionCategory = products;
      const men = products
        .filter((product) => product.category === "men")
        .splice(0, 3);

      const women = products
        .filter((product) => product.category === "women")
        .splice(0, 3);

      const kids = products
        .filter((product) => product.category === "kids")
        .splice(0, 2);

      setSuggestionProducts([...men, ...women, ...kids]);

      const relatedCategory = suggestionCategory.filter(
        (prod) => prod.subCategory === product.subCategory
      );

      setRelatedProducts([...relatedCategory]);
    }
  }, [products, product]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 100);

  //   return () => clearTimeout(timeout);
  // }, [location]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid product-detail-page">
          <Breadcrumb />
          <div className="container custom-container">
            <div className="product-detail-row_one row">
              <div className="col-12 col-md-6 product-slider-container">
                {product.images && (
                  <ProductDetailSlider
                    selectedProductImage={product.images}
                    category={product.category}
                  />
                )}
              </div>
              <div className="col-12 col-md-6">
                <ProductDetailPage product={product} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <SuggestedProduct products={suggestionProduct} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <RelatedProducts products={relatedProducts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
