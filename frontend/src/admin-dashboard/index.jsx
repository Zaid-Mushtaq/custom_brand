import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import "../sass/admindashboard/dashboard.scss";
import AdminPanelHeader from "./header";
import Sidebar from "./sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAdminProduct } from "../actions/productAction";
import { getAllOrders } from "../actions/orderAction";
import { useAlert } from "react-alert";
import { getAllUsers } from "../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products, length } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.totalStock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders && orders.forEach((item) => (totalAmount += item.totalPrice));
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "rgba(31, 63, 73, 0.8)",
        borderColor: "#EA6A47",
        borderWidth: 2,
        pointBackgroundColor: "#EA6A47",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#EA6A47",
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#DE2D41", "#0091D5", "#FFD700"],
        hoverBackgroundColor: ["#A6101E", "#006996", "#D4AF37"],
        data: [outOfStock, length - outOfStock],
        borderColor: "#20283E",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-main-container">
      <div className="row header-container-fluid">
        <div className="col-12">
          <AdminPanelHeader />
        </div>
      </div>

      <div className="main-dashboard-content">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p className="dashboard-total">
                Total Amount <br /> €{totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>

            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
