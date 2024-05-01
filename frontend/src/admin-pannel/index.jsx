import React, { useState } from "react";
import "../sass/adminPanel/panel.scss";
import SideBar from "./sidebar";
import Dashboard from "./dashboard";
import AdminPanelHeader from "./header";

const AdminPanel = () => {
  const [selectedItem, setSelectedItem] = useState("Products");

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="dashboard-main-container">
      <div className="container-fluid header-container-fluid">
        <div className="row">
          <div className="col-12">
            <AdminPanelHeader />
          </div>
        </div>
      </div>

      <div className="container-fluid main-container-fluid">
        <div className="row">
          <div className="col-2 col-md-1 col-lg-2 _sidebar-column">
            <SideBar onSidebarItemClick={handleSidebarItemClick} />
          </div>
          <div className="col-10 col-md-11 col-lg-10 _dashboard-column">
            <Dashboard selectedItem={selectedItem} />
          </div>
        </div>
      </div>

      <div className="admin-pannel"></div>
    </div>
  );
};

export default AdminPanel;
