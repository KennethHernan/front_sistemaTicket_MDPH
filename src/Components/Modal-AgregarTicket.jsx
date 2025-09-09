import React, { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import exit from "../assets/exit.svg";
import buton_solicitar from "../assets/save-add.svg";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

const AgregarTicket = ({ selectedOption, cerrarModal }) => {
  const {
    capturaDatos,
    user,
    uploadImge,
    createTicket,
    setChecked,
    setMessageInfo,
    menssageServices,
  } = useAuth();
  const [option, setOption] = useState("");
  const [detalle, setDetalle] = useState("");
  const [mensajeImagen, setMensajeImagen] = useState(false);
  const navigate = useNavigate();

  const opciones = [
    { value: "1", label: "Incidencias de Hardware" },
    { value: "2", label: "Incidencias de Software" },
    { value: "3", label: "Redes y Conectividad" },
    { value: "4", label: "Mantenimiento Preventivo" },
    { value: "5", label: "Solicitudes de Usuario" },
    { value: "6", label: "Correo y Comunicaciones" },
  ];

  const handledDetalleChange = (e) => {
    setDetalle(e.target.value);
  };

  useEffect(() => {
    if (selectedOption !== undefined) {
      setOption(selectedOption.toString());
    }
  }, [selectedOption]);

  useEffect(() => {
    if (user) return;
    const fetchData = async () => {
      try {
        await capturaDatos();
      } catch (error) {
        console.error("Error al capturar datos:", error);
      }
    };
    fetchData();
  }, []);

  // Función para subir la imagen
  const registrar = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (option === "") return alert("Selecciona el tipo de incidencia.");
    if (!detalle)
      return alert("Por favor, ingresa el detalle de la incidencia.");

    const seleccion = opciones.find((op) => op.value === option);
    
    if (mensajeImagen) {
      const formData = new FormData();
      formData.append("imagen", file);
      formData.append("nombrePC", user.nombrePC);
      const preview_Url = await uploadImge(formData);

      const Data_con_Img = {
        detalle: detalle,
        nombrePC: user.nombrePC,
        tipoIncidencia: seleccion.label,
        ip: user.ip,
        imagenUrl: preview_Url,
      };
      
      const response = await createTicket(Data_con_Img);
      const numTicket = String(response.numeroTicket).padStart(4, "0");

      if (response.ok) {
        const text = `Se ha registrado un nuevo ticket:\n\n*Nª Ticket* : ${numTicket}\n*Detalle* : ${detalle}\n*Tipo de Incidencia* : ${seleccion.label}\n*PC* : ${user.nombrePC}`;
        menssageServices(text);
        setMessageInfo("¡Ticket creado con éxito!");
        setChecked(true);
        cerrarModal();
        navigate("/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg");
      }
    } else {
      const Data_sin_Img = {
        detalle: detalle,
        nombrePC: user.nombrePC,
        tipoIncidencia: seleccion.label,
        ip: user.ip,
        imagenUrl: "null",
      };

      const response = await createTicket(Data_sin_Img);
      const numTicket = String(response.numeroTicket).padStart(4, "0");
      if (response.ok) {
        const text = `Se ha registrado un nuevo ticket:\n\n*Nª Ticket* : ${numTicket}\n*Detalle* : ${detalle}\n*Tipo de Incidencia* : ${seleccion.label}\n*PC* : ${user.nombrePC}`;
        menssageServices(text);
        setMessageInfo("¡Ticket creado con éxito!");
        setChecked(true);
        cerrarModal();
        navigate("/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg");
      }
    }
  };

  const manejarCambioArchivo = (e) => {
    if (e.target.files.length > 0) {
      setMensajeImagen(true);
    } else {
      setMensajeImagen(false);
    }
  };

  // const userInfo = useMemo(() => {
  //   if (!user) return <p className="animate-pulse">Cargando Información...</p>;
  //   return (
  //     <>
  //       <p>{user.nombrePC}</p>
  //       <p>{user.ip}</p>
  //     </>
  //   );
  // }, [user]);

  return (
    <div
      className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-[100vh] bg-[#00000082] overflow-hidden"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <section className="h-auto bg-[#fff] flex flex-col items-center w-full mx-10 sm:mx-20 md:mx-50 lg:mx-80 py-5 px-10 text-[#797979] text-[14px] font-light">
        <div className="w-full flex items-center justify-between">
          <p className="text-[18px] font-medium">Registrar Ticket</p>
          <img
            src={exit}
            className="hover:rotate-6 cursor-pointer"
            onClick={cerrarModal}
            alt="Cerrar modal"
          />
        </div>

        <div className="w-full mt-8 h-full px-10 lg:px-30 grid gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-[150px_1fr]">
          {/* <p>Información PC:</p>
          <div className="bg-[#fafafa] border p-3 w-full rounded-md flex justify-between gap-5 overflow-hidden">
            {userInfo}
          </div> */}

          <div className="flex">
            <p>Tipo de incidencia:</p>
            {selectedOption === 0 && (
              <span className="ml-2 text-[#f00]">*</span>
            )}
          </div>
          <select
            value={option}
            required
            onChange={(e) => setOption(e.target.value)}
            className="border p-3 w-full rounded-md focus:outline-none"
          >
            <option value="">Selecciona el tipo de incidencia...</option>
            <option value="1">Incidencias de Hardware (Equipos)</option>
            <option value="2">Incidencias de Software (Aplicaciones)</option>
            <option value="3">Redes y Conectividad</option>
            <option value="4">Mantenimiento Preventivo</option>
            <option value="5">Solicitudes de Usuario</option>
            <option value="6">Correo y Comunicaciones</option>
          </select>

          <div className="flex">
            <p>Detalle aquí el incidente:</p>
            <span className="ml-2 text-[#f00]">*</span>
          </div>
          <textarea
            id="detalle"
            required
            onChange={handledDetalleChange}
            name="detalle"
            rows="4"
            placeholder="Solicito asistencia en..."
            className="h-20 border p-3 w-full rounded-md focus:outline-none"
          />

          <div className="flex mt-3">
            <p>Si tiene una imagen del problema (Pantalla, Error, etc.):</p>
          </div>

          <div>
            <input
              className="lg:mt-3"
              type="file"
              required
              id="fileInput"
              name="imagen"
              accept="image/*"
              onChange={manejarCambioArchivo}
            ></input>
            {mensajeImagen && (
              <p className="text-[13px] text-[#62c703]">
                Imagen seleccionada con éxito
              </p>
            )}
          </div>
        </div>

        <button
          className="flex text-[13px] mt-[45px] items-center gap-4 m-5 rounded-sm text-[#fff] bottom-0 right-0 px-[80px] py-[10px] bg-[#0367C7] hover:opacity-95"
          onClick={registrar}
        >
          <img src={buton_solicitar} className="w-[20px]" alt="Registrar" />
          <p>Registrar</p>
        </button>
        <div id="preview"></div>
      </section>
    </div>
  );
};

export default AgregarTicket;
