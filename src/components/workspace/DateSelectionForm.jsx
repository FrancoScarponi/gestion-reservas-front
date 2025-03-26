import React from "react";
//Form del selector de fecha de reserva deseada
export const DateSelectionForm = ({ date, setDate, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col items-center p-6 rounded-lg shadow border">
      <label htmlFor="date" className="text-white text-lg font-semibold mb-2">Selecciona un dia</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-white text-black bg-gray-100 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold w-full">
        Consultar
      </button>
    </form>
  );
};
