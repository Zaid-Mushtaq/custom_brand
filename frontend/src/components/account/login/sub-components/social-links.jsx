import React from "react";
import "../../../../sass/components/account/login/socialLinks.scss";
import { WhiteButton } from "../../../reuseable/button";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLinks = () => {
  return (
    <div className="other-signin-container d-none">
      <div className="social-links-container">
        <div className="signin-with-text-wrapper">
          <p>—Or sign in with—</p>
        </div>
      </div>
      <div className="register-container">
        <div className="links-icons-container">
          <WhiteButton
            label={<AiFillInstagram className="--icon" />}
            customClasses={"instagram-btn"}
          />

          <WhiteButton
            label={<FaFacebookSquare className="--icon" />}
            customClasses={"instagram-btn"}
          />

          <WhiteButton
            label={<FcGoogle className="--icon" />}
            customClasses={"instagram-btn"}
          />
        </div>
        {/* <div className="register-text-wrapper">
          <p className="register-text">Don't have an account?</p>
          <Link className="register-link" onClick={handleCreateAccount}>
            {dynamicTextProps}
          </Link>
        </div>
        <div className="terms-conditions-container">
          <p className="terms-conditions-text">
            By clicking Signup with Facebook, Apple, or Google, you are
            acknowledging and agreeing to our{" "}
            <Link className="link">terms & conditions</Link> .
            <Link className="link">Privacy Policy</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SocialLinks;
