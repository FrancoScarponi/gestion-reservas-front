import React from "react";
import { ReservationActions } from "./ReservationActions";

export const ReservationItem = ({ reservation, onUpdate, isAdmin }) => {
  return (
    <li className="flex justify-between items-center p-2 bg-zinc-800 rounded-md shadow">
      <div className="flex w-full justify-between mr-8">
        <div>
          <p className="font-semibold">Espacio: {reservation.workspace.name}</p>
          <p className="text-sm italic">
            Estado:{" "}
            <span
              className={`font-bold ${
                reservation.status === "approved"
                  ? "text-green-500"
                  : reservation.status === "rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {reservation.status}
            </span>
          </p>
        </div>
        <div>
          <p className="text-nowrap">Fecha: {reservation.date}</p>
          <p>
            Horario: {reservation.start_time} - {reservation.end_time}
          </p>
        </div>
      </div>
      {isAdmin && reservation.status === "pending" && (
        <ReservationActions reservation={reservation} onUpdate={onUpdate} />
      )}
    </li>
  );
};
