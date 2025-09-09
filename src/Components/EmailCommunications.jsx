import React from "react";
import correo_comunicaciones from "../assets/correo_comunicaciones.svg";

const EmailCommunications = ({ handleClick }) => (
  <div
    onClick={handleClick}
    className="border border-[#B3B3B3] flex gap-[10px] p-3 hover:bg-[#f9f9f9] rounded-md"
  >
    <div className="w-[130px] h-[130px] overflow-hidden flex items-center justify-center bg-cover">
      <img src={correo_comunicaciones} className="w-full h-full object-cover" />
    </div>
    <section>
      <p className="font-normal">Correo y Comunicaciones</p>
      <ul className="w-auto list-disc pl-5">
        <li>Problemas con correo institucional</li>
        <li>Recuperación de contraseña</li>
        <li>Correos rechazados o spam</li>
      </ul>
    </section>
  </div>
);

export default EmailCommunications;
