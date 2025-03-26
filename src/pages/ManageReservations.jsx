import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getReservationsPending,
  updateReservationStatus,
} from "../services/reservationService";
import { Pagination } from "../components/common/Pagination";
import { ReservationList } from "../components/reservation/ReservationList";

export const ManageReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchReservations(page);
  }, [page]);

  const fetchReservations = async (page) => {
    try {
      const response = await getReservationsPending(page);
      setReservations(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  const handleUpdateReservationStatus = async (id, status) => {
    try {
      await updateReservationStatus(id, status);
      setReservations((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status } : res))
      );
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[32rem] p-6 bg-zinc-900 text-white rounded-lg shadow-md w-full max-w-[50rem] mx-auto my-3">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Reservas Pendientes</h2>
      {reservations.length === 0 ? (
        <p>No hay reservas pendientes.</p>
      ) : (
        <ReservationList
          reservations={reservations}
          onUpdate={handleUpdateReservationStatus}
          isAdmin={user?.role === "admin"}
        />
      )}
      <div>
        <Pagination
          currentPage={pagination?.current_page || 1}
          totalPages={pagination?.last_page || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
