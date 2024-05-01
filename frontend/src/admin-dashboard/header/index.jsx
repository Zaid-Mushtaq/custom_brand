import React, { useState, useEffect } from "react";
import "../../sass/admindashboard/adminDashboardHeader.scss";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FiSettings, FiEdit, FiLogOut } from "react-icons/fi";
import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/image1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const AdminPanelHeader = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.user);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogoutAccount = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");

    setTimeout(() => {
      navigate("/login");
    }, "1000");
  };

  useEffect(() => {
    return () => {
      setIsProfileDropdownOpen(false);
    };
  }, []);

  return (
    <Navbar sticky="top" className="_navbar">
      <Navbar.Brand href="#home" className="navbar-brand">
        <div className="logo-container">
          <a href="/">
            <img className="img-fluid" src={Logo} alt="logo" />
          </a>
        </div>
      </Navbar.Brand>

      <div className="panel-heading d-md-block d-none">
        <h2>Admin Panel</h2>
      </div>

      <Nav className="ms-auto profile-search-container">
        <div
          className={`avatar-dropdown-toggle ${
            isProfileDropdownOpen ? "open" : ""
          }`}
          onClick={toggleProfileDropdown}
        >
          <img
            className="avatar"
            src={user && user.ecommerceImg ? user.ecommerceImg.url : Avatar}
            alt="avatar"
          />
          {isLoggedIn && <div className="green-dot"></div>}
          <Dropdown
            align="end"
            show={isProfileDropdownOpen}
            onToggle={toggleProfileDropdown}
            className="_dropdown"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <FiSettings />
                <Link to={`/account/password`}>Settings</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <FiEdit />
                <Link to={`/account/profile`}>Edit</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <FiLogOut />
                <Link onClick={handleLogoutAccount}>Logout</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Nav>
    </Navbar>
  );
};

export default AdminPanelHeader;
