import React, { useState, useEffect, useRef } from "react";
import "../../sass/components/header.scss";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { useNavigate } from "react-router-dom";
import MiniCart from "../minicart/miniCart";
import { Link } from "react-router-dom";
import LocalsDropdown from "./localsDropdown";
import LoginUser from "../popup/loginModal";
import Logo from "../../assets/images/logo.png";
import Search from "../../utils/search";
import { getHomeProduct, clearErrors } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import CreateAccountModal from "../popup/accountModal";
import ForgotPasswordModal from "../popup/forgotPasswordModal";
import AccountPopup from "../account/login/sub-components/account-popup";
import ConfirmationPopup from "../popupModal/popupModal";
import { removeItemsFromCart } from "../../actions/cartAction";

const Header = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.homeProducts
  );

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    setCartQuantity(
      cartItems.reduce((total, item) => total + item.quantity, 0)
    );
  }, [cartQuantity, cartItems]);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [filteredMenCategory, setMenFilteredCategory] = useState([""]);
  const [filteredWomenCategory, setWomenFilteredCategory] = useState([""]);
  const [filteredKidsCategory, setKidsFilteredCategory] = useState([""]);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getHomeProduct());
  }, [dispatch, error]);

  useEffect(() => {
    if (products && products.length > 0) {
      const menCategory = products.filter(
        (product) => product.category === "men"
      );

      setMenFilteredCategory((prev) => [
        ...new Set(menCategory.map((product) => product.subCategory)),
      ]);

      const womenCategory = products.filter(
        (product) => product.category === "women"
      );

      setWomenFilteredCategory((prev) => [
        ...new Set(womenCategory.map((product) => product.subCategory)),
      ]);

      const kidsCategory = products.filter(
        (product) => product.category === "kids"
      );

      setKidsFilteredCategory((prev) => [
        ...new Set(kidsCategory.map((product) => product.subCategory)),
      ]);
    }
  }, [products]);

  useEffect(() => {
    const body = document.body;
    if (isModalOpen || isCreateAccountOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [isModalOpen, isCreateAccountOpen]);

  const onSelectCategory = (categoryTitle) => {
    const lowercaseCategory = categoryTitle.toLowerCase();

    const newPath = lowercaseCategory
      ? `/product-list/${encodeURIComponent(lowercaseCategory)}`
      : "/product-list";

    navigate(newPath);
  };

  const handleRemoveProduct = (stockId, itemName) => {
    setSelectedProductId(stockId);
    setShowConfirmation(true);
    setShowMiniCart(false);
  };

  const confirmRemoveProduct = () => {
    dispatch(removeItemsFromCart(selectedProductId));
    setShowConfirmation(false);
  };

  const cancelRemoveProduct = () => {
    setShowConfirmation(false);
  };

  const handleUserIconHover = () => {
    setShowUserModal(true);
  };

  const handleUserIconLeave = () => {
    setShowUserModal(false);
  };

  // const handleUserIconClick = () => {
  //   setShowUserModal(!showUserModal);
  // };

  const handleLoginClick = () => {
    const currentRoute = window.location.pathname;
    if (currentRoute === "/login" || currentRoute === "/account") {
      console.log("You are already on the login page");
    } else {
      setModalOpen(true);
      setCreateAccountOpen(false);
      setShowUserModal(false);
    }
  };

  const handleCreateAccountClick = () => {
    const currentRoute = window.location.pathname;
    if (currentRoute === "/login" || currentRoute === "/account") {
      console.log("You are already on the login page");
    } else {
      setCreateAccountOpen(true);
      setModalOpen(false);
      setShowUserModal(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCreateAccountOpen(false);
    setForgotPasswordOpen(false);
    const body = document.body;
    body.style.overflow = "auto";
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = () => {
    setCreateAccountOpen(true);
    setModalOpen(false);
  };

  const handleForgotPassword = () => {
    setCreateAccountOpen(false);
    setModalOpen(false);
    setForgotPasswordOpen(true);
  };

  const handleReturnToLogin = () => {
    setModalOpen(true);
    setCreateAccountOpen(false);
    setForgotPasswordOpen(false);
  };

  const handleMouseEnter = () => {
    setShowMiniCart(true);
  };

  const handleMouseLeave = () => {
    setShowMiniCart(false);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchOpen(!isSearchOpen);
  };

  const handleCloseClick = () => {
    setSearchOpen(false);
  };

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      <nav className="navbar fixed-top navbar">
        <div className="container-fluid navbar-container">
          <div className="logo-container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              onClick={toggleOffcanvas}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">
              <img
                className="img-fluid d-lg-block d-none"
                src={Logo}
                alt="logo"
              />
              <h2 className="d-flex d-lg-none">
                <span className="dc-text">DC</span>{" "}
                <span className="tech-text">Technologies</span>
              </h2>
            </a>
          </div>

          <div className="icons-container d-flex d-lg-none" ref={dropdownRef}>
            <ul>
              <li>
                <LocalsDropdown />
              </li>
              <li
                onMouseEnter={handleUserIconHover}
                onMouseLeave={handleUserIconLeave}
              >
                <Link className="nav-link nav-item-account_popup">
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
                <Link className="nav-link nav-item-minicart">
                  <CiShoppingCart className="icon" />
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
          <DesktopNav
            onSelectCategory={onSelectCategory}
            showUserModal={showUserModal}
            handleUserIconHover={handleUserIconHover}
            handleUserIconLeave={handleUserIconLeave}
            handleLoginClick={handleLoginClick}
            handleCreateAccountClick={handleCreateAccountClick}
            setShowUserModal={setShowUserModal}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            showMiniCart={showMiniCart}
            cartQuantity={cartQuantity}
            handleSearchClick={handleSearchClick}
            isSearchOpen={isSearchOpen}
            setSearchOpen={setSearchOpen}
            handleCloseClick={handleCloseClick}
            filteredMenCategory={filteredMenCategory}
            filteredWomenCategory={filteredWomenCategory}
            filteredKidsCategory={filteredKidsCategory}
            isAuthenticated={isAuthenticated}
            handleRemoveProduct={handleRemoveProduct}
          />
          <MobileNav
            onSelectCategory={onSelectCategory}
            isOffcanvasOpen={isOffcanvasOpen}
            toggleOffcanvas={toggleOffcanvas}
            filteredMenCategory={filteredMenCategory}
            filteredWomenCategory={filteredWomenCategory}
            filteredKidsCategory={filteredKidsCategory}
          />

          <div className="input-container d-flex d-lg-none  mb-2">
            <Search handleCloseClick={handleCloseClick} />
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <LoginUser
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
          handleCreateAccount={handleCreateAccount}
          handleForgotPassword={handleForgotPassword}
          setModalOpen={setModalOpen}
        />
      )}

      {isCreateAccountOpen && (
        <CreateAccountModal
          handleClose={handleCloseModal}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          showPassword={showPassword}
          handleTogglePassword={handleTogglePassword}
          handleReturnToLogin={handleReturnToLogin}
        />
      )}

      {isForgotPasswordOpen && (
        <ForgotPasswordModal
          handleClose={handleCloseModal}
          handleReturnToLogin={handleReturnToLogin}
        />
      )}

      {showConfirmation && (
        <ConfirmationPopup
          show={showConfirmation}
          onCancel={cancelRemoveProduct}
          onConfirm={confirmRemoveProduct}
          itemName={
            selectedProductId
              ? cartItems.find((item) => item.id === selectedProductId)?.name
              : ""
          }
        />
      )}
    </>
  );
};

export default Header;
