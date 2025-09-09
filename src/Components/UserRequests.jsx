import React from "react";
import solicitudes_usuario from "../assets/solicitudes_usuario.svg";

const UserRequests = ({ handleClick }) => (
  <div
    onClick={handleClick}
    className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md"
  >
    <div className="w-[130px] h-[130px] overflow-hidden flex items-center justify-center">
      <img src={solicitudes_usuario} className="w-full h-full object-cover" />
    </div>
    <section>
      <p className="font-normal">Solicitudes de Usuario</p>
      <ul className="w-auto list-disc pl-5">
        <li>Creación/modificación de cuentas</li>
        <li>Asignación de permisos en sistemas</li>
        <li>Solicitud de instalación de aplicación</li>
        <li>Solicitud de instalaión de nuevo equipo</li>
      </ul>
    </section>
  </div>
);

export default UserRequests;
