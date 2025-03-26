import React from "react";

export const ReservationActions = ({ reservation, onUpdate }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onUpdate(reservation.id, "approved")}
        className="bg-green-600 px-2 py-1 rounded-md hover:bg-green-700 cursor-pointer"
      >
        Aceptar
      </button>
      <button
        onClick={() => onUpdate(reservation.id, "rejected")}
        className="bg-red-600 px-2 py-1 rounded-md hover:bg-red-700 cursor-pointer"
      >
        Rechazar
      </button>
    </div>
  );
};
