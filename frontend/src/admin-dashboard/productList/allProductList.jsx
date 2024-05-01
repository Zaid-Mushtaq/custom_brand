import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "../../sass/admindashboard/allproductlist.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import Pagination from "react-js-pagination";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import ConfirmationPopup from "../../components/popupModal/popupModal";

const AllProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products, length } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10); // State for products per page
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  //show a message to delete product or not
  const handleRemoveProduct = (productId) => {
    setSelectedProductId(productId);
    setShowConfirmation(true);
  };
  //Cancel the request
  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };

  //delete product
  const deleteProductHandler = () => {
    dispatch(deleteProduct(selectedProductId));
    setShowConfirmation(false);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle change of products per page
  const handleProductsPerPageChange = (e) => {
    setResultPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Filter products based on search term
  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * resultPerPage;
  const indexOfFirstProduct = indexOfLastProduct - resultPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber);

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

          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>

            {currentPage === 1 && length && length > 10 && (
              <div className="products-per-page">
                <label htmlFor="productsPerPage">Products Show: </label>
                <select
                  id="productsPerPage"
                  value={resultPerPage}
                  onChange={handleProductsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={150}>150</option>
                  <option value={200}>200</option>
                  <option value={250}>250</option>
                </select>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.totalStock}</td>
                      <td>&#8364;{product.price.toFixed(2)}</td>
                      <td>
                        <Link
                          to={`/admin/product/${product._id}`}
                          className="table-button"
                        >
                          <EditIcon />
                        </Link>
                        <Link
                          className="table-button"
                          onClick={() => handleRemoveProduct(product._id)}
                          // onClick={() => deleteProductHandler(product._id)}
                        >
                          <DeleteIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProducts.length}
                onChange={setCurrentPageNo}
                nextPageText={<FaChevronRight className="icon" />}
                prevPageText={<FaChevronLeft className="icon" />}
                firstPageText={<FaChevronLeft className="icon" />}
                lastPageText={<FaChevronRight className="icon" />}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationPopup
        show={showConfirmation}
        onCancel={handleCancelRemove}
        onConfirm={deleteProductHandler}
        itemName={
          selectedProductId
            ? currentProducts.find((item) => item._id === selectedProductId)
                ?.name
            : ""
        }
      />
    </Fragment>
  );
};

export default AllProductList;
