import React from "react";
import "../../../sass/components/checkout/checkoutCreateAccount.scss";
import { PrimaryButton, SecondaryButton } from "../../reuseable/button";
import { Link, useNavigate } from "react-router-dom";

const CheckoutCreateAccount = ({
  handleCreateAccount,
  handleReturnToLogin,
  activeComponent,
}) => {
  const navigate = useNavigate();

  const handleNavigateCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="checkout-create-account-container">
      <div className="_account-heading-wrapper">
        <h3 className="__account-heading">Don't have an account ?</h3>
      </div>

      <div className="_button-wrapper">
        {activeComponent === "SignIn" ? (
          <PrimaryButton
            label={"create an account"}
            customClasses={"create-account-button"}
            type="button"
            onClick={handleCreateAccount}
          />
        ) : (
          <PrimaryButton
            label={"Sign In"}
            customClasses={"create-account-button"}
            type="button"
            onClick={handleReturnToLogin}
          />
        )}

        <SecondaryButton
          label={"Checkout as guest"}
          customClasses={"as-guest-button"}
          type="button"
          onClick={handleNavigateCheckout}
        />
      </div>

      <div className="terms-conditions-container">
        <p className="terms-conditions-text">
          By proceeding with this action, you are acknowledging and agreeing to
          our <Link className="link">terms & conditions</Link> as well as our{" "}
          <Link className="link">Privacy Policy</Link>. Your understanding and
          compliance with these policies are appreciated.
        </p>
      </div>
    </div>
  );
};

export default CheckoutCreateAccount;
