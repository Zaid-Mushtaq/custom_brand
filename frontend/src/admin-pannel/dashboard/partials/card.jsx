import React from "react";
import Products from "../partials/products";
import Users from "../partials/users";
import Reviews from "../partials/reviews";
import AdminInfo from "../partials/adminInfo";

const TableCard = ({ selectedItem }) => {
  let selectedComponent;

  switch (selectedItem) {
    case "Products":
      selectedComponent = <Products />;
      break;
    case "Users":
      selectedComponent = <Users />;
      break;
    case "Reviews":
      selectedComponent = <Reviews />;
      break;
    case "AdminInfo":
      selectedComponent = <AdminInfo />;
      break;
    default:
      selectedComponent = null;
  }

  return (
    <div>
      <div className="row">
        <div className="col-12 ">
          <div className="card">{selectedComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
