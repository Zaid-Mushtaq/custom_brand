import React from "react";
import LoggedUserDetail from "../../components/account/accountProfile/loggedUserDetail";
import "../../sass/pages/account/account.scss";

const Account = () => {
  return (
    <div className="container-fluid account-page">
      <div className="container mb-5">
        <div className="row">
          <div className="col-12 account-page-main-column">
            <LoggedUserDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
