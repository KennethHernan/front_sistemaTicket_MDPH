import React from "react";
import incidencias_hard from "../assets/incidencias_hardware.svg";

const HardwareIncidents = ({ handleClick }) => (
  <div 
  onClick={handleClick}
  className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md">
    <div className="w-[130px] h-[130px] overflow-hidden flex items-center justify-center">
      <img src={incidencias_hard} alt="Incidencias de Hardware" className="w-full h-full object-cover" />
    </div>
    <section>
      <p className="font-normal">Incidencias de Hardware</p>
      <ul className="w-auto list-disc pl-5">
        <li>Fallas de PC (Computadora)</li>
        <li>Impresoras y escáneres</li>
        <li>Periféricos (mouse, teclado, monitor)</li>
        <li>Fallas de Anexo</li>
      </ul>
    </section>
  </div>
);

export default HardwareIncidents;
