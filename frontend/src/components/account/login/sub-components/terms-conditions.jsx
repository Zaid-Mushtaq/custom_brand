import React from "react";
import { Link } from "react-router-dom";
import "../../../../sass/components/account/login/termsConditions.scss";

const TermsConditions = ({ handleCreateAccount, dynamicTextProps }) => {
  return (
    <div className="register-term-container">
      <div className="register-text-wrapper">
        <p className="register-text">Don't have an account?</p>
        <Link className="register-link" onClick={handleCreateAccount}>
          {dynamicTextProps}
        </Link>
      </div>
      <div className="terms-conditions-container">
        <p className="terms-conditions-text">
          you are acknowledging and agreeing to our{" "}
          <Link className="link">terms & conditions</Link> .
          <Link className="link">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
