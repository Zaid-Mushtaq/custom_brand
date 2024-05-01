import React, { useState, useEffect } from "react";
import "../../sass/adminPanel/adminPanelHeader.scss";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FiSettings, FiEdit, FiLogOut } from "react-icons/fi";
import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/image1.jpg";

const AdminPanelHeader = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
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
          <img className="avatar" src={Avatar} alt="avatar" />
          {isLoggedIn && <div className="green-dot"></div>}
          <Dropdown
            align="end"
            show={isProfileDropdownOpen}
            onToggle={toggleProfileDropdown}
            className="_dropdown"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <FiSettings /> Settings
              </Dropdown.Item>
              <Dropdown.Item>
                <FiEdit /> Edit
              </Dropdown.Item>
              <Dropdown.Item>
                <FiLogOut /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Nav>
    </Navbar>
  );
};

export default AdminPanelHeader;
