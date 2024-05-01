import React, { Fragment, useEffect, useState } from "react";
import "../../sass/pages/plp/product-list.scss";
import ProductTile from "../../components/plp/product-tile";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../utils/loader";
import { useAlert } from "react-alert";
import { PrimaryButton } from "../../components/reuseable/button";

const ProductList = () => {
  const { category, keyword, subCategory, page } = useParams();
  const alert = useAlert();
  const [getCategory, setCategory] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showingSpinner, setShowingSpinner] = useState(false);

  const { loading, error, products, resultPerPage, filterredProductsCount } =
    useSelector((state) => state.products);

  let count = filterredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get("page") || "1";

    setAllProducts([]);
    setCurrentPage(parseInt(pageNumber) || 1);

    dispatch(getProduct(category, keyword, currentPage, subCategory));
  }, [
    dispatch,
    error,
    alert,
    category,
    keyword,
    subCategory,
    window.location.search,
    currentPage,
  ]);

  useEffect(() => {
    if (products && products.length > 0) {
      let lowercaseCategory = category ? decodeURIComponent(category) : "men";

      if (currentPage === 1) {
        setAllProducts(products);
      } else {
        setAllProducts([...products]); // Set only the new products without appending
      }

      setCategory(lowercaseCategory);
    }
  }, [products, category, currentPage]);

  const handleShowMore = () => {
    if (loading || loadingMore) {
      return;
    }

    const nextPage = currentPage + 1;
    setShowingSpinner(true);

    dispatch(getProduct(category, keyword, nextPage, subCategory));

    setCurrentPage(nextPage);
    if (subCategory && subCategory) {
      navigate(`/product-list/${category}/${subCategory}?page=${nextPage}`);
    } else {
      navigate(`/product-list/${category}?page=${nextPage}`);
    }

    setTimeout(() => {
      setShowingSpinner(false);
    }, 1000);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid product-list-page">
          <Breadcrumb />
          <div className="container mb-5">
            {allProducts.length > 0 && (
              <ProductTile
                productsData={allProducts}
                productType={getCategory}
              />
            )}
            {resultPerPage < count && allProducts.length < count && (
              <div className="show-more-container">
                <PrimaryButton
                  label={loadingMore ? "Loading..." : "Show More"}
                  onClick={handleShowMore}
                  customClasses="show-more-btn"
                  disabled={loadingMore}
                  isSpinner={showingSpinner}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductList;
