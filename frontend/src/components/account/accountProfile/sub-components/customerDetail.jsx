import React from "react";
import "../../../../sass/components/account/accountProfile/customerDetail.scss";
import { Link } from "react-router-dom";

function CustomerDetail({
  heading,
  linkProfile,
  linkPassword,
  passwordMask,
  passwordCode,
  customerDetails,
  customerName,
  customerEmail,
  addNewLink,
  addPaymentLink
}) {
  const maskPassword = (password) => {
    return "*".repeat(password.length);
  };

  return (
    <div className="common-customer-detail">
      <div className="common-detail-edit-conatiner">
        <h3 className="common-detail-heading">{heading}</h3>
        {linkProfile && (
          <Link to="/account/profile" className="common-edit-link">
            Edit
          </Link>
        )}

        {linkPassword && (
          <Link to="/account/password" className="common-edit-link">
            Edit
          </Link>
        )}
      </div>
      {passwordMask && (
        <p className="__password">{maskPassword(passwordCode)}</p>
      )}
      {customerDetails && (
        <div className="common-details">
          <p className="user_name">{customerName}</p>
          <p>{customerEmail}</p>
        </div>
      )}
      {addNewLink && (
        <Link to="/account/add-address" className='common-new-add-link'>Add New</Link>
      )}

      {addPaymentLink && (
        <Link to="/account/add-payment" className='common-new-add-link'>Add New</Link>
      )}
    </div>
  );
}

export default CustomerDetail;
