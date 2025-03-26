import React from "react";
import { useNavigate } from "react-router-dom";
//Tarjeta generica para mostrar datos
export const Card = ({ title, description, otherText,path }) => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center  bg-zinc-900 text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex flex-col items-start w-full">
        <h2 className="text-xl font-semibold mb-1 text-blue-400">{title}</h2>
        {description && <p className="text-zinc-300">{description}</p>}
        {otherText && <p className="text-zinc-300">{description}</p>}
      </div>
      <button onClick={()=>navigate(path)} className="mt-4 min-w-28 bg-zinc-700 px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Ver mas
      </button>
    </div>
  );
};
