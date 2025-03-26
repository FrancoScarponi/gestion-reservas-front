import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  return user &&  user.role=="admin" ? <Outlet /> : <Navigate to="/workspaces" replace />;
};
