import React, { useEffect, useState } from "react";
import { getUserReservations } from "../services/reservationService";
import { Pagination } from "../components/common/Pagination";

export const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getUserReservations(page);
      setPagination(response.pagination);
      setReservations(response.data);
      setLoading(false);
    };
    fetchReservations();
  }, [page]);

  if (loading) return <p className="text-white">Cargando reservas...</p>;

  return (
    <section className="h-fit max-w-4xl mx-auto my-2 p-6 bg-zinc-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-400 mb-2">Mis Reservas</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-400">No tenes ninguna reserva.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li
              key={res.id}
              className="p-2 rounded-lg bg-zinc-800"
            >
              <h3 className="text-lg font-semibold text-blue-300">
                {res.workspace.name} {`(${res.status})`}
              </h3>

              <p className="text-gray-400">{res.workspace.location}</p>
              <div className="flex gap-5 justify-center">
                <p>{res.date}</p>
                <p>
                  {res.start_time}:00 - {res.end_time}:00
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Pagination
          currentPage={pagination.current_page || 1}
          totalPages={pagination.last_page || 1}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};
