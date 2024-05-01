import React, { useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import MensCloth from "../../assets/images/mens-cloth.avif";
import WomenCloth from "../../assets/images/women-cloth.avif";
import KidsCloth from "../../assets/images/kids-cloth.jpg";
import LocalsDropdown from "./localsDropdown";
import { Link } from "react-router-dom";
import DropDown from "./dropDown";
import MiniCart from "../minicart/miniCart";
import Search from "../../utils/search";
import AccountPopup from "../account/login/sub-components/account-popup";

const DesktopNav = ({
  onSelectCategory,
  showUserModal,
  handleLoginClick,
  handleCreateAccountClick,
  handleUserIconHover,
  handleUserIconLeave,
  handleMouseEnter,
  handleMouseLeave,
  showMiniCart,
  cartQuantity,
  handleSearchClick,
  isSearchOpen,
  setSearchOpen,
  handleCloseClick,
  filteredMenCategory,
  filteredWomenCategory,
  filteredKidsCategory,
  isAuthenticated,
  handleRemoveProduct,
}) => {
  const categories = {
    men: {
      title: "Men",
      imageSrc: MensCloth,
      items: filteredMenCategory,
    },
    women: {
      title: "Women",
      imageSrc: WomenCloth,
      items: filteredWomenCategory,
    },
    kids: {
      title: "Kids",
      imageSrc: KidsCloth,
      items: filteredKidsCategory,
    },
  };

  return (
    <>
      <ul className="navbar-nav custom-navbar-nav">
        {Object.keys(categories).map((key) => (
          <li key={key} className="nav-item">
            <DropDown
              {...categories[key]}
              onSelectCategory={onSelectCategory}
              setSearchOpen={setSearchOpen}
              categoryClass={`${key}-dropdown`}
              mainCategory={key}
            />
          </li>
        ))}
        <li className="nav-item">
          <a className="nav-link" href="#">
            New Arrivals
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Gift Cards
          </a>
        </li>
      </ul>
      <div className="icons-container">
        <ul>
          <li>
            <LocalsDropdown />
          </li>
          <li className="serach-wrapper">
            <a onClick={handleSearchClick}>
              <CiSearch className="icon" />
            </a>
          </li>
          <li
            onMouseEnter={handleUserIconHover}
            onMouseLeave={handleUserIconLeave}
          >
            <Link className="nav-link nav-item-account_popup" to="#">
              <CiUser className="icon" />
              {showUserModal && (
                <AccountPopup
                  handleLoginClick={handleLoginClick}
                  handleCreateAccountClick={handleCreateAccountClick}
                />
              )}
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link className="nav-link nav-item-minicart" to="#">
              <HiOutlineShoppingBag className="icon bag-icon" />
              {cartQuantity > 0 && (
                <span className="cart-count">{cartQuantity}</span>
              )}
              {showMiniCart && (
                <MiniCart handleRemoveProduct={handleRemoveProduct} />
              )}
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`search-container medium-search d-none d-lg-flex ${
          isSearchOpen ? "open" : ""
        }`}
      >
        {isSearchOpen && <Search handleCloseClick={handleCloseClick} />}
      </div>
    </>
  );
};

export default DesktopNav;
