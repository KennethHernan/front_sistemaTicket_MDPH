import React from "react";
import mantenimiento_preventivo from "../assets/mantenimiento-preventivo.svg";

const PreventiveMaintenance = ({ handleClick }) => (
  <div
    onClick={handleClick}
    className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md"
  >
    <div className="w-[130px] h-[130px] overflow-hidden flex items-center justify-center">
      <img
        src={mantenimiento_preventivo}
        className="w-full h-full object-cover"
      />
    </div>
    <section>
      <p className="font-normal">Mantenimiento Preventivo</p>
      <ul className="w-auto list-disc pl-5">
        <li>Limpieza de hardware</li>
        <li>Respaldo de datos</li>
        <li>Revisión de antivirus</li>
        <li>Optimización de equipos</li>
      </ul>
    </section>
  </div>
);

export default PreventiveMaintenance;
