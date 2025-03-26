import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Workspaces } from "../pages/Workspaces";
import { AuthRoutes } from "./AuthRoutes";
import { Register } from "../pages/Register";
import { AuthLayout } from "../layouts/AuthLayout";
import { ShowWorkspace } from "../pages/ShowWorkspace";
import { Reservations } from "../pages/Reservations";
import { AdminRoute } from "./AdminRoute";
import { ManageReservations } from "../pages/ManageReservations";
export const AppRoute = () => {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AuthLayout />}>
        {/* Rutas clientes */}
        <Route element={<AuthRoutes />}>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/workspace/:id" element={<ShowWorkspace />} />
        </Route>

        {/* Rutas admin */}
        <Route element={<AdminRoute/>}>
          <Route path="/reservations/manage" element={<ManageReservations/>}/>
        </Route>
      </Route>
    </Routes>
  );
};
