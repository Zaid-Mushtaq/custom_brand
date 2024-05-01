import React from "react";
import DataTable from "./table";

const Reviews = () => {
  const columns = [
    { name: "Review Id", selector: "rid", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Reviews", selector: "reviews", sortable: true },
    { name: "Operations", selector: "crud", sortable: true },
  ];

  const data = [
    {
      rid: 1,
      name: "Junaid",
      type: "Admin",
      reviews: 5,
      crud: "Delete",
    },
    {
      rid: 2,
      name: "Usama",
      type: "Customer",
      reviews: 4,
      crud: "Edit",
    },

    {
      rid: 3,
      name: "Aizaz",
      type: "Customer",
      reviews: 3,
      crud: "Edit",
    },
    {
      rid: 4,
      name: "John",
      type: "Customer",
      reviews: 5,
      crud: "Delete",
    },
    {
      rid: 5,
      name: "Waqar",
      type: "Admin",
      reviews: 4,
      crud: "Edit",
    },

    {
      rid: 6,
      name: "Hashim",
      type: "Admin",
      reviews: 5,
      crud: "Edit",
    },
    {
      rid: 7,
      name: "Smith",
      type: "Customer",
      reviews: 3,
      crud: "Edit",
    },
  ];
  return (
    <div>
      <div className="card-header">
        <h4>Reviews Detail</h4>
      </div>
      <div className="card-body">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Reviews;
