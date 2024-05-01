import React from "react";
import DataTable from "./table";

const Users = () => {
  const columns = [
    { name: "User Id", selector: "uid", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Country", selector: "country", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Address", selector: "address", sortable: true },
    { name: "Status", selector: "status", sortable: true },
    { name: "Operations", selector: "crud", sortable: true },
  ];

  const data = [
    {
      uid: 1,
      name: "Junaid",
      country: "United States",
      email: "abc1@gmail.com",
      address: "Jakarta",
      status: "Online",
      crud: "Delete",
    },
    {
      uid: 2,
      name: "Usama",
      country: "Dubai",
      email: "abc2@gmail.com",
      address: "Abu dhabi",
      status: "Offline",
      crud: "Edit",
    },

    {
      uid: 3,
      name: "Aizaz",
      country: "England",
      email: "abc3@gmail.com",
      address: "London",
      status: "Online",
      crud: "Edit",
    },
    {
      uid: 4,
      name: "John",
      country: "United States",
      email: "abc1@gmail.com",
      address: "Jakarta",
      status: "Online",
      crud: "Delete",
    },
    {
      uid: 5,
      name: "Waqar",
      country: "Dubai",
      email: "abc2@gmail.com",
      address: "Abu dhabi",
      status: "Offline",
      crud: "Edit",
    },

    {
      uid: 6,
      name: "Hashim",
      country: "Paris",
      email: "abc3@gmail.com",
      address: "London",
      status: "Online",
      crud: "Edit",
    },
    {
      uid: 7,
      name: "Smith",
      country: "Paris",
      email: "abc3@gmail.com",
      address: "London",
      status: "Online",
      crud: "Edit",
    },
  ];
  return (
    <div>
      <div className="card-header">
        <h4>Users Detail</h4>
      </div>
      <div className="card-body">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Users;
