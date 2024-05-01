import React, { useState } from "react";
import "../../sass/components/footer.scss";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import { CgArrowLongRight } from "react-icons/cg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container footer-container">
          <div className="row footer-first-row">
            <div className="col-12 col-md-4 brand-name-col">
              <a href="/" className="footer-site-logo">
                <p className="dc-text">DC</p>
                <p className="tech-text">Technologies</p>
              </a>
              <p>
                DigitsCom Technologies: Elevating E-Commerce Excellence
                Worldwide. Discover the epitome of fashion with our premier
                clothing retail site.
              </p>

              <div className="terms-container">
                <ul className="list-unstyled link-menu nav-left">
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Code of Conduct</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 footer-main-links-container">
              <div className="row">
                <div className="col-6 col-md-3 footer-links-col-one">
                  <h3>Our Products</h3>
                  <ul className="list-unstyled links">
                    <li>
                      <a href="/product-list">Mens</a>
                    </li>
                    <li>
                      <a href="/product-list">Womens</a>
                    </li>
                    <li>
                      <a href="/product-list">Kids</a>
                    </li>
                    <li>
                      <a href="#">New Arrivals</a>
                    </li>
                    <li>
                      <a href="#">Gift Cards</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 footer-links-col-second">
                  <h3>About</h3>
                  <ul className="list-unstyled links">
                    <li>
                      <a href="#">About-us</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Team</a>
                    </li>
                    <li>
                      <a href="#">Career</a>
                    </li>
                    <li>
                      <a href="#">Contacts</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-6 footer-links-col-three">
                  <div className="join-us">
                    <div className="join-us-button-container">
                      <button type="button" className="btn btn-join">
                        Join-us
                        <CgArrowLongRight className="arrow-icon" />
                      </button>
                    </div>

                    <div className="subscribe-warapper">
                      <p className="subscribe-text">
                        Subscribe for exclusive updates and insider offers!
                      </p>
                      <div className="input-group subscribe-conatiner">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          className="btn"
                          type="button"
                          id="button-addon2"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row footer-second-row">
            <div className="col-12 pb-4 footer-second-row-col-one">
              <div className="line"></div>
            </div>
          </div>

          <div className="row footer-icons-wrraper">
            <div className="col-12 center-content">
              <p>Custom Brand &copy; {currentYear}</p>
              <div className="footer-icons-container">
                <ul className="list-unstyled social nav-right">
                  <li>
                    <a href="#">
                      <FaTwitter className="footer-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram className="footer-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaFacebook className="footer-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaPinterest className="footer-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
