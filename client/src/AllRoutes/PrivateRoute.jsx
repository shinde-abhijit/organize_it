import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If token exists, allow access, otherwise redirect
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
