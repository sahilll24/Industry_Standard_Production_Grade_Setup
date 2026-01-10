import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const roleToRouteFallback = {
  admin: "/AdminDashboard",
  doctor: "/DoctorDashboard",
  patient: "/PatientDashboard",
};

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={roleToRouteFallback[user.role] || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;


