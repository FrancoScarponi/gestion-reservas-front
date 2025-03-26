import React from "react";
import { ReservationItem } from "./ReservationItem";

export const ReservationList = ({ reservations, onUpdate, isAdmin }) => {
  return (
    <ul className="space-y-4 flex flex-col justify-start flex-grow">
      {reservations.map((res) => (
        <ReservationItem
          key={res.id}
          reservation={res}
          onUpdate={onUpdate}
          isAdmin={isAdmin}
        />
      ))}
    </ul>
  );
};
