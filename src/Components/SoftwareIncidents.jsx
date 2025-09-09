import React from "react";
import incidencias_soft from "../assets/incidencias_software.svg";

const SoftwareIncidents = ({handleClick}) => (
  <div
    onClick={handleClick}
    className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md"
  >
    <div className="w-[130px] h-[130px] overflow-hidden flex items-center justify-center">
      <img src={incidencias_soft} className="w-full h-full object-cover" />
    </div>
    <section>
      <p className="font-normal">Incidencias de Software</p>
      <ul className="w-auto list-disc pl-5">
        <li>Sistemas (PIDE, SIAF, Sistema de Rentas etc.)</li>
        <li>Aplicaciones ofimáticas (Word, Excel, etc.)</li>
        <li>Fallos de instalación o actualización</li>
        <li>Errores de aplicaciones internas</li>
      </ul>
    </section>
  </div>
);

export default SoftwareIncidents;
