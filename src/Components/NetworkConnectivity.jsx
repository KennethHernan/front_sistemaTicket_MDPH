import React from "react";
import redes_conectividad from "../assets/redes_conectividad.svg";

const NetworkConnectivity = ({ handleClick }) => (
  <div
    onClick={handleClick}
    className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md"
  >
    <div className="w-[130px] h-[130px] bg-cover overflow-hidden flex items-center justify-center">
      <img src={redes_conectividad} className="w-full h-full object-cover" />
    </div>
    <section>
      <p className="font-normal">Redes y Conectividad</p>
      <ul className="w-auto list-disc pl-5">
        <li>Fallas en red interna (LAN/Wi-Fi)</li>
        <li>Habilitación nuevo punto de Red</li>
        <li>Error al ingresar a una página web</li>
        <li>Acceso a Plataformas (Youtube, Redes Sociales)</li>
      </ul>
    </section>
  </div>
);

export default NetworkConnectivity;
