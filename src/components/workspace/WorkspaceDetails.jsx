import React from "react";
//Tarjeta para listar los datos de los workspaces
export const WorkspaceDetails = ({ workspace }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-2xl font-semibold text-blue-400">{workspace.name}</h2>
      <p className="text-zinc-300 mt-2">{workspace.description}</p>
      <p className="text-zinc-400 mt-2">
        <strong>Ubicacion:</strong> {workspace.location}
      </p>
    </div>
  );
};
