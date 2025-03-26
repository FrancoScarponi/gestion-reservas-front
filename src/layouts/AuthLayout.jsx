import React, { useContext, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
//Layout para las vistas auth
export const AuthLayout = () => {
  const { user, logout } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  return (
    <div className="flex flex-col w-full h-full">
      <nav className="w-full bg-zinc-900 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold min-w-[9rem] mr-10">
            Mi Aplicación
          </h1>
          {/* Botones de navegación */}
          <div className="flex gap-4 w-full">
            <ul className="flex items-center justify-evenly gap-4">
              <li>
                <Link
                  to="/workspaces"
                  className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Workspaces
                </Link>
              </li>
              <li>
                <Link
                  to="/reservations"
                  className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Reservas
                </Link>
              </li>
              {user.role == "admin" && (
                <li>
                  <Link
                    to="/reservations/manage"
                    className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
                  >
                    Gestionar reservas
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex w-full justify-end">
              <Link
                onClick={() => logout()}
                to="/"
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex w-full h-full justify-center bg-zinc-800">
        <Outlet />
      </main>
    </div>
  );
};
