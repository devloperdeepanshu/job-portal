import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/register" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
};

export default PrivateRoute;
