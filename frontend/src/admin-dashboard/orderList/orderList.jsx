import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "../../sass/admindashboard/allOrderList.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import Pagination from "react-js-pagination";
import ConfirmationPopup from "../../components/popupModal/popupModal";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10); // State for products per page
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrderId, setselectedOrderId] = useState(null);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  //show a message to delete product or not
  const handleDeleteProduct = (orderId) => {
    setselectedOrderId(orderId);
    setShowConfirmation(true);
  };
  //Cancel the request
  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };

  //delete product
  const deleteOrderHandler = () => {
    dispatch(deleteOrder(selectedOrderId));
    setShowConfirmation(false);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle change of products per page
  const handleOrdersPerPageChange = (e) => {
    setResultPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Filter products based on search term
  const filteredOrders = orders
    ? orders.filter((order) => order.orderNo.includes(searchTerm))
    : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * resultPerPage;

  const indexOfFirstProduct = indexOfLastProduct - resultPerPage;
  const currentOrders = filteredOrders.slice(
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

          <div className="orderListContainer">
            <h1 id="productListHeading">ALL Orders</h1>
            <div className="search-container">
              <input
                type="number"
                placeholder="Search by orderNo"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>

            {currentPage === 1 && orders && orders.length > 10 && (
              <div className="products-per-page">
                <label htmlFor="productsPerPage">Products Show: </label>
                <select
                  id="productsPerPage"
                  value={resultPerPage}
                  onChange={handleOrdersPerPageChange}
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
                    <th>Order No</th>
                    <th>Items Qty</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders &&
                    currentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderNo}</td>
                        <td>{order.orderItems.length}</td>
                        <td>{order.totalPrice}</td>
                        <td
                          className={
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus}
                        </td>
                        <td>
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="table-button"
                          >
                            <EditIcon />
                          </Link>
                          <Link
                            className="table-button"
                            onClick={() => handleDeleteProduct(order._id)}
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
                totalItemsCount={filteredOrders.length}
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

        <ConfirmationPopup
          show={showConfirmation}
          onCancel={handleCancelRemove}
          onConfirm={deleteOrderHandler}
          itemName={
            selectedOrderId
              ? currentOrders.find((item) => item._id === selectedOrderId)
                  ?.orderNo
              : ""
          }
        />
      </div>
    </Fragment>
  );
};

export default OrderList;
