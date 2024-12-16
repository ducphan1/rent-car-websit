import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, requiredRole, children }) => {
  if (role !== requiredRole) {
    alert("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
