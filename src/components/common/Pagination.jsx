import React from "react";
//Logica de paginacion de datos
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {/* Btn Anterior */}
      <button
        className={`px-4 py-2 rounded-md transition ${
          currentPage === 1
            ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
            : "bg-zinc-700 hover:bg-blue-600 text-white"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {/* Pagina actual */}
      <span className="text-white bg-zinc-900 px-4 py-2 rounded-md">
        Pagina {currentPage} de {totalPages}
      </span>

      {/* Btn siguiente */}
      <button
        className={`px-4 py-2 rounded-md transition ${
          currentPage === totalPages
            ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
            : "bg-zinc-700 hover:bg-blue-600 text-white"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};
