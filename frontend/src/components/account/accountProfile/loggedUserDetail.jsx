import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../../sass/components/account/accountProfile/loggedUserDetail.scss";
import Loader from "../../../utils/loader";
import CustomerDetail from "./sub-components/customerDetail";

const LoggedUserDetail = () => {
  let navigate = useNavigate();
  let { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="logged-user-detail-section">
          <h2 className="my-account">my account</h2>
          <div className="row user-detail-section">
            <div className="col-12 col-md-6 user-profile-section">
              <CustomerDetail
                heading={"Profile"}
                linkProfile={true}
                passwordMask={false}
                customerDetails={true}
                customerName={user.name}
                customerEmail={user.email}
                addNewLink={false}
              />

              <CustomerDetail
                heading={"Password"}
                linkPassword={true}
                passwordMask={true}
                passwordCode={"1234578"}
                customerDetails={false}
                customerName={"John Smith"}
                customerEmail={"abc@gmail.com"}
                addNewLink={false}
              />
            </div>
            <div className="col-12 col-md-6 user-information-section">
              <CustomerDetail
                heading={"Address Book"}
                link={false}
                passwordMask={false}
                customerDetails={false}
                customerName={"John Smith"}
                customerEmail={"abc@gmail.com"}
                addNewLink={true}
                addPaymentLink={false}
              />

              <CustomerDetail
                heading={"Payment"}
                link={false}
                passwordMask={false}
                customerDetails={false}
                customerName={"John Smith"}
                customerEmail={"abc@gmail.com"}
                addNewLink={false}
                addPaymentLink={true}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LoggedUserDetail;
