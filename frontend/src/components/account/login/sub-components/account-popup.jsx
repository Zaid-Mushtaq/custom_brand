import React, { useState, useEffect } from "react";
import "../../../../sass/components/account/login/accountPopup.scss";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { IoBasket } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
  TransparentButton,
} from "../../../reuseable/button";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../../../actions/userAction";
import { useNavigate } from "react-router";

const AccountPopup = ({ handleLoginClick, handleCreateAccountClick }) => {
  const [greeting, setGreeting] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        setGreeting("Good Morning!");
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting("Good Afternoon!");
      } else {
        setGreeting("Good Night!");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogoutAccount = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully");

    setTimeout(() => {
      navigate("/login");
    }, "1000");
  };

  return (
    <>
      <div className="account-popup-container">
        <div className="row account-popup-row">
          <div className="status-container">
            <h3>{greeting}</h3>
          </div>
          <div className="col-12 col-md-8 account-btn-column">
            <div className="account-btn-wrapper">
              <p className="account-heading-text">
                Sign in for a more personalized experience
              </p>
              {!isAuthenticated && (
                <div className="login-create-account-btns-container">
                  <PrimaryButton
                    onClick={handleLoginClick}
                    label="Login"
                    customClasses="__login"
                  />
                  <SecondaryButton
                    onClick={handleCreateAccountClick}
                    label="Create Account"
                    customClasses="__create-account"
                  />
                </div>
              )}
              {isAuthenticated && (
                <div className="logout-btn-container">
                  <PrimaryButton label="Logout" onClick={handleLogoutAccount} />
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-4 account-items-column">
            <div className="account-items-wrapper">
              {user && user.role === "admin" && (
                <div className="dasboard-link-container">
                  <Link to={"/admin/dashboard"} className="dashboard-link">
                    <MdDashboard className="__icon" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              )}
              <div className="myAccount-link-container">
                <Link to={"/login"} className="myAccount-link">
                  <MdAccountCircle className="__icon" /> <span>My Account</span>
                </Link>
              </div>
              {user && (
                <div className="orders-link-container">
                  <Link to={"/orders"} className="orders-link">
                    <IoBasket className="__icon" />
                    <span>Orders</span>
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div className="logout-link-container">
                  <Link className="logout-link">
                    <RiLogoutCircleRFill className="__icon" />
                    <span onClick={handleLogoutAccount}>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPopup;
