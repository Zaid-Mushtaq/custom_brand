import React, { useState, useEffect } from "react";
import "../../sass/components/mobileNav.scss";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MobileNav = ({
  onSelectCategory,
  isOffcanvasOpen,
  toggleOffcanvas,
  filteredMenCategory,
  filteredWomenCategory,
  filteredKidsCategory,
}) => {
  useEffect(() => {
    const offcanvasBackdrop = document.querySelector(".offcanvas-backdrop");
    const body = document.querySelector("body");
    if (isOffcanvasOpen && offcanvasBackdrop) {
      offcanvasBackdrop.classList.add("show");
    } else if (offcanvasBackdrop) {
      offcanvasBackdrop.classList.remove("show");
      body.style.overflow = "auto";
    }
  }, [isOffcanvasOpen]);

  const menuData = [
    {
      label: "Men",
      submenus: filteredMenCategory,
    },
    {
      label: "Women",
      submenus: filteredWomenCategory,
    },
    {
      label: "Kids",
      submenus: filteredKidsCategory,
    },
    { label: "New Arrivals" },
    { label: "Gift Cards" },
  ];

  const onCategorySelected = () => {
    toggleOffcanvas();
  };

  const renderMenuItem = (menuItem) => {
    if (menuItem.submenus) {
      return (
        <li className="nav-item dropdown line-break" key={menuItem.label}>
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            {menuItem.label}
            <FaChevronDown className="arrow-down-icon" />
          </a>
          <ul className="dropdown-menu custom-dropdown-menu shadow">
            {menuItem.submenus.map((submenu, index) => (
              <li className="dropstart" key={index}>
                <Link
                  to={`/product-list/${
                    menuItem.label
                  }/${submenu.toLowerCase()}`}
                  className="dropdown-item dropdown-toggle"
                  data-bs-auto-close="outside"
                  onClick={onCategorySelected}
                >
                  {submenu}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    } else {
      return (
        <li className="nav-item line-break" key={menuItem.label}>
          <a className="nav-link" href="#">
            {menuItem.label}
          </a>
        </li>
      );
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
      tabIndex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={toggleOffcanvas}
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          {menuData.map(renderMenuItem)}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
