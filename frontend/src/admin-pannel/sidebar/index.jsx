import React, { useState, useEffect } from "react";
import "../../sass/adminPanel/sidebar.scss";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineReviews,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const SideBar = ({ onSidebarItemClick }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    setIsLabelVisible(!isMobileSidebarOpen);
  };

  const handleSidebarItemClick = (item) => {
    onSidebarItemClick(item);
    setIsMobileSidebarOpen(false);
    setIsLabelVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSidebarOpen(window.innerWidth > 992);
      setIsLabelVisible(window.innerWidth > 992);
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
      <div
        className={`mobile-toggle ${isMobileSidebarOpen ? "open" : "close"}`}
        onClick={toggleMobileSidebar}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>

      <nav
        id="sidebar"
        className={`bg-light sidebar ${isMobileSidebarOpen ? "show" : "hide"}`}
      >
        <div className="sidebar-wrapper position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => handleSidebarItemClick("Products")}
              >
                <MdOutlineProductionQuantityLimits className="icons" />
                <span
                  className={`ml-2 ${isLabelVisible ? "visible" : "hidden"}`}
                >
                  Products
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => handleSidebarItemClick("Users")}
              >
                <FiUsers className="icons" />
                <span
                  className={`ml-2 ${isLabelVisible ? "visible" : "hidden"}`}
                >
                  Users
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => handleSidebarItemClick("Reviews")}
              >
                <MdOutlineReviews className="icons" />
                <span
                  className={`ml-2 ${isLabelVisible ? "visible" : "hidden"}`}
                >
                  Reviews
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => handleSidebarItemClick("AdminInfo")}
              >
                <MdOutlineAdminPanelSettings className="icons" />
                <span
                  className={`ml-2 ${isLabelVisible ? "visible" : "hidden"}`}
                >
                  Admin Info
                </span>
              </a>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <IoMdLogOut className="icons" />
                <span
                  className={`ml-2 ${isLabelVisible ? "visible" : "hidden"}`}
                >
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

export default SideBar;
