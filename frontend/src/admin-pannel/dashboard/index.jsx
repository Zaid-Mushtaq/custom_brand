import React from "react";
import "../../sass/adminPanel/panel.scss";
import TableCard from "./partials/card";

const Dashboard = ({ selectedItem }) => {
  return (
    <div className="dashboard-container ">
      <main className="main-dashboard">
        <TableCard selectedItem={selectedItem} />
      </main>
    </div>
  );
};

export default Dashboard;
