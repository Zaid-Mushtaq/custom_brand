import React from "react";
import DataTable from "./table";

const Products = () => {
  const columns = [
    { name: "Product Id", selector: "pid", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Title", selector: "title", sortable: true },
    { name: "Price", selector: "price", sortable: true },
    { name: "description", selector: "description", sortable: true },
    { name: "Status", selector: "status", sortable: true },
    { name: "Operations", selector: "crud", sortable: true },
  ];

  const data = [
    {
      pid: 1,
      name: "Sweter",
      title: "Winter",
      price: "600",
      description: "Winter Collection",
      status: "In Stock",
      crud: "Delete",
    },

    {
      pid: 2,
      name: "Shirt",
      title: "Summer",
      price: "400",
      description: "Summer Collection",
      status: "In Stock",
      crud: "Edit",
    },

    {
      pid: 3,
      name: "Pant",
      title: "Summer",
      price: "700",
      description: "Summer Collection",
      status: "Out of Stock",
      crud: "Edit",
    },
  ];

  return (
    <div>
      <div className="card-header">
        <h4>Product Detail</h4>
      </div>
      <div className="card-body">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Products;
