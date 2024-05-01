import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "../../sass/adminPanel/sidebar.scss";
import { IoMdLogOut } from "react-icons/io";
import {
  MdDashboard,
  MdPeople,
  MdListAlt,
  MdRateReview,
  MdAddBox,
  MdCreate,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleLogoutAccount = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");

    setTimeout(() => {
      navigate("/login");
    }, "1000");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setIsMobileSidebarOpen(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`sidebar-container ${
        isMobileSidebarOpen ? "mobile-open" : ""
      }`}
    >
      {isSmallScreen && (
        <div
          className={`mobile-toggle ${isMobileSidebarOpen ? "open" : "close"}`}
          onClick={toggleMobileSidebar}
        >
          <MenuIcon />
        </div>
      )}

      <nav
        id="sidebar"
        className={`bg-light sidebar ${isMobileSidebarOpen ? "show" : "hide"}`}
      >
        <div className="sidebar-wrapper position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                <MdDashboard className="icon" />
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/products" className="nav-link">
                <MdAddBox className="icon" />
                <span className="text">Products</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/product" className="nav-link">
                <MdCreate className="icon" />
                <span className="text">New Product</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link">
                <MdListAlt className="icon" />
                <span className="text">Orders</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">
                <MdPeople className="icon" />
                <span className="text">Users</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/reviews" className="nav-link">
                <MdRateReview className="icon" />
                <span className="text">Reviews</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <IoMdLogOut className="icon" />
                <span className="text" onClick={handleLogoutAccount}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
