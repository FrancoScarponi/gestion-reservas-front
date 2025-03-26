import React from "react";
//Modal para realizar la reserva del workspace
export const ReservationModal = ({ schedule, startHour, endHour, handleHourSelection, handleReserve, isValidSelection, handleCloseModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Selecciona tu horario</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Horarios disponibles</h3>
          <ul className="mt-2 w-full">
            {schedule.map(({ hour, available }) => {
              const isSelected = startHour !== null && endHour !== null && hour >= startHour && hour < endHour;

              return (
                <li
                  key={hour}
                  className={`p-1 my-1 rounded-md text-center cursor-pointer ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : available
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 cursor-not-allowed"
                  }`}
                  onClick={() => available && handleHourSelection(hour)}
                >
                  {hour}:00 - {hour + 1}:00 {available ? "Disponible" : "No disponible"}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={handleReserve}
          className={`mt-4 px-6 py-2 rounded-md transition w-full ${
            isValidSelection() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!isValidSelection()}
        >
          Reservar {startHour !== null && endHour !== null ? `de ${startHour}:00 a ${endHour}:00` : ""}
        </button>

        <button onClick={handleCloseModal} className="mt-2 text-red-400 hover:text-red-500 w-full">
          Cerrar
        </button>
      </div>
    </div>
  );
};
