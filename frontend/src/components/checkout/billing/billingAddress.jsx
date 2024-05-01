import React, { useState } from "react";
import "../../../sass/components/checkout/billingAddress.scss";
import BillingAddressFields from "./sub-components/billingAddressFields";
import CustomCheckbox from "../../reuseable/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateBillingInfo } from "../../../actions/cartAction";
import { useEffect } from "react";

const BillingAddress = () => {
  const [useSameAddress, setUseSameAddress] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { billingInfo, shippingInfo } = useSelector((state) => state.cart);
  const [billingForm, setBillingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (useSameAddress) {
      dispatch(updateBillingInfo(shippingInfo));
    } else {
      sessionStorage.removeItem("billingFormData");
      setBillingForm({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  }, [billingInfo, user, useSameAddress, shippingInfo]);

  const handleCheckboxChange = () => {
    const newUseSameAddress = !useSameAddress;
    setUseSameAddress(newUseSameAddress);
    if (newUseSameAddress) {
      dispatch(updateBillingInfo(shippingInfo));
      sessionStorage.setItem("billingFormData", JSON.stringify(shippingInfo));
    } else {
      dispatch(updateBillingInfo({ firstName: "", lastName: "", email: "" }));
    }
  };

  const checkboxClasses = [" ", "custom_label", "custom_input"];

  return (
    <div className="billing-conatiner">
      <h2 className="billing-heading">Billing Address</h2>
      <form>
        <div className="checkbox-container common-wrapper">
          <div className="checkbox-button-container common-wrapper">
            <div className="box-label-container">
              <CustomCheckbox
                label="Billing Address Same as Shipping ..."
                checked={useSameAddress}
                onChange={handleCheckboxChange}
                customCheckboxClasses={checkboxClasses}
              />
            </div>
          </div>
        </div>
        {!useSameAddress && (
          <BillingAddressFields
            firstName={billingForm.firstName}
            lastName={billingForm.lastName}
            email={billingForm.email}
          />
        )}
      </form>
    </div>
  );
};

export default BillingAddress;
