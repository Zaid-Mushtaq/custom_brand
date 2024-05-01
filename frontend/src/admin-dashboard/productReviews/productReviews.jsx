import React, { Fragment, useEffect, useState } from "react";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import "../../sass/admindashboard/productReviews.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "react-js-pagination";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import ConfirmationPopup from "../../components/popupModal/popupModal";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../actions/productAction";
import Star from "@material-ui/icons/Star";
import { Button } from "@material-ui/core";
import Loader from "../../utils/loader";

const ProductReviews = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const [searchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10); // State for products per page
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [productId, setProductId] = useState();
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId && productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error("Review Deleted Successfully");
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Delete Review Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, isDeleted, navigate, alert, deleteError, productId]);

  //show a message to delete product or not
  const handleRemoveReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowConfirmation(true);
  };
  //Cancel the request
  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };

  // Ok Request
  const deleteReviewHandler = () => {
    console.log(selectedReviewId, "::", productId);
    dispatch(deleteReviews(selectedReviewId, productId));
    setShowConfirmation(false);
  };

  // Handle change of products per page
  const handleReviewsPerPageChange = (e) => {
    setResultPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Filter products based on search term
  const filteredReviews = reviews
    ? reviews.filter((review) =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  // Pagination logic
  const indexOfLastReview = currentPage * resultPerPage;
  const indexOfFirstReview = indexOfLastReview - resultPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Change page
  const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard-main-container">
            <div className="row header-container-fluid">
              <div className="col-12">
                <AdminPanelHeader />
              </div>
            </div>
            <div className="main-dashboard-content">
              <Sidebar />

              <div className="productReviewsContainer">
                <h1 id="reviewHeading">ALL REVIEWS</h1>

                <form
                  className="updateReviewForm"
                  encType="multipart/form-data"
                  onSubmit={productReviewsSubmitHandler}
                >
                  <div className="review-content">
                    <Star />

                    <input
                      className="update-review-input-data"
                      type="text"
                      placeholder="Product Id"
                      required
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <Button
                    id="findReviewBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || productId === "" ? true : false
                    }
                  >
                    Find Reviews
                  </Button>
                </form>

                {reviews &&
                  reviews.length > 10 &&
                  currentPage &&
                  currentPage === 1 && (
                    <div className="reviews-per-page">
                      <label htmlFor="reviewsPerPage">Reviews Show: </label>
                      <select
                        id="reviewsPerPage"
                        value={resultPerPage}
                        onChange={handleReviewsPerPageChange}
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

                {reviews && reviews.length > 0 ? (
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Review Id</th>
                          <th>User</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentReviews &&
                          currentReviews.map((review) => (
                            <tr key={review._id}>
                              <td>{review._id}</td>
                              <td>{review.name}</td>
                              <td>{review.comment}</td>
                              <td
                                className={
                                  review && review.rating >= 3
                                    ? "greenColor"
                                    : "redColor"
                                }
                              >
                                {review.rating}
                              </td>
                              <td>
                                <Link
                                  className="table-button"
                                  onClick={() => handleRemoveReview(review._id)}
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
                ) : (
                  <h1 className="productReviewsFormHeading">
                    No Reviews Found
                  </h1>
                )}

                {/* Pagination */}
                {reviews && reviews.length > 10 && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={filteredReviews.length}
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
                )}
              </div>
            </div>
          </div>
          <ConfirmationPopup
            show={showConfirmation}
            onCancel={handleCancelRemove}
            onConfirm={deleteReviewHandler}
            itemName={
              selectedReviewId
                ? currentReviews.find((item) => item._id === selectedReviewId)
                    ?.name
                : ""
            }
          />
        </>
      )}
    </Fragment>
  );
};

export default ProductReviews;
