import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../sass/admindashboard/usersList.scss";
import AdminPanelHeader from "../header";
import Sidebar from "../sidebar/sidebar";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationPopup from "../../components/popupModal/popupModal";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10); // State for products per page
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(null);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  //show a message to delete users or not
  const handleDeleteProduct = (orderId) => {
    setselectedUserId(orderId);
    setShowConfirmation(true);
  };
  //Cancel the request
  const handleCancelRemove = () => {
    setShowConfirmation(false);
  };

  //delete product
  const deleteOrderHandler = () => {
    dispatch(deleteUser(selectedUserId));
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
  const filteredUsers = users
    ? users.filter((user) => user.email && user.email.includes(searchTerm))
    : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * resultPerPage;

  const indexOfFirstProduct = indexOfLastProduct - resultPerPage;
  const currentUsers = filteredUsers.slice(
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

          <div className="userListContainer">
            <h1 id="productListHeading">ALL USERS</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by user email"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>

            {currentPage === 1 && users && users.length > 10 && (
              <div className="user-per-page">
                <label htmlFor="userPerPage">User's Show: </label>
                <select
                  id="userPerPage"
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
                    <th>User Id</th>
                    <th>Email</th>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers &&
                    currentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.phonenumber}</td>
                        <td
                          className={
                            user.role === "admin" ? "greenColor" : "redColor"
                          }
                        >
                          {user.role}
                        </td>
                        <td>
                          <Link
                            to={`/admin/user/${user._id}`}
                            className="table-button"
                          >
                            <EditIcon />
                          </Link>
                          <Link
                            className="table-button"
                            onClick={() => handleDeleteProduct(user._id)}
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
                totalItemsCount={filteredUsers.length}
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
            selectedUserId
              ? currentUsers.find((item) => item._id === selectedUserId)
                  ?.orderNo
              : ""
          }
        />
      </div>
    </Fragment>
  );
};

export default UsersList;
