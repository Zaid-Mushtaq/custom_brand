import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, element: Element, ...props }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null;
  }

  if (loading === false && isAuthenticated === false && user === null) {
    // If not authenticated
    return <Navigate to="/login" />;
  }

  if (loading === false && isAdmin && user.role !== "admin") {
    // Admin required but user is not admin, navigate to login
    return <Navigate to="/login" />;
  }

  if (loading === false && isAuthenticated) {
    return <Element {...props} />;
  }
};

export default ProtectedRoute;
