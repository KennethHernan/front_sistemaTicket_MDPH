import Header from "../Layout/Header";
import { useEffect, useState, useRef } from "react";
import buton_cancelar from "../assets/error.svg";
import exit from "../assets/exit_plomo.svg";
import buscar from "../assets/seach_plomo.svg";
import { useAuth } from "../context/AuthContext";
import buton_solicitar from "../assets/save-add.svg";
import ZoomImage from "../Components/zoomImg";
import { set } from "react-hook-form";
const VITE_INFORMATICO = import.meta.env.VITE_INFORMATICO;
const VITE_INFORMATICO2 = import.meta.env.VITE_INFORMATICO2;
const VITE_INFORMATICO3 = import.meta.env.VITE_INFORMATICO3;
const VITE_INFORMATICO4 = import.meta.env.VITE_INFORMATICO4;

function HistorialTicket() {
  const {
    listarTickets,
    cancelarTicket,
    capturaDatos,
    tickets,
    user,
    administrador,
    asignarResponsable,
    finalizarTicket,
    setUpdate,
    update,
    setMessageInfo,
    setChecked,
    postDeleteImgs,
  } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpencancel, setModalOpencancel] = useState(false);
  const [nTicket, setNTicket] = useState("");
  const [nombrePC, setNombrePC] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [incidencia, setIncidencia] = useState("");
  const [detalle, setDetalle] = useState("");
  const [asignado, setAsignado] = useState("");
  const [estado, setEstado] = useState("");
  const [ipPriv, setIpPriv] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [id, setId] = useState("");
  const [searchTicket, setSearchTicket] = useState("");

  useEffect(() => {
    if (update) {
      listarTickets();
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    actualizarLista();

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

  const filteredTickets = tickets.filter((ticket) =>
    String(ticket.numeroTicket).padStart(4, "0").includes(searchTicket)
  );
  const detalleModal = () => setModalOpen(!modalOpen);
  const cancelarTicketModal = (_id, imgUrl) => {
    setId(_id);
    setImgUrl(imgUrl);
    setModalOpencancel(!modalOpencancel);
  };

  const cancelarTicketFunction = async () => {
    if (id === "") return alert("No se ha seleccionado ningun ticket");
    const data = { id: id };
    await cancelarTicket(data);
    if (imgUrl != "null") {
      await postDeleteImgs({ imgUrl: imgUrl });
    }
    setModalOpencancel(!modalOpencancel);

    actualizarLista();

    setMessageInfo("¡Ticket cancelado con éxito!");
    setChecked(true);
  };

  const actualizarLista = () => {
    listarTickets();
  };

  const handleObservar = (ticket) => {
    setId(ticket._id);
    setNTicket(ticket.numeroTicket);
    setNombrePC(ticket.namePC);
    setFechaCreacion(
      new Date(ticket.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
        " " +
        new Date(ticket.createdAt).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
    );
    setIncidencia(ticket.incidencia);
    setDetalle(ticket.detail);
    setEstado(ticket.estado);
    setIpPriv(ticket.ip);
    setImgUrl(ticket.imgUrl);
    if (administrador) {
      setAsignado("");
    } else {
      setAsignado(ticket.asignado);
    }
    detalleModal();
  };

  const handleAsignarResponsable = async () => {
    if (asignado === "") return alert("El campo responsable no puede estar vacio");
    const data = { id: id, asignado: asignado.toUpperCase() };
    await asignarResponsable(data);
    detalleModal();
    actualizarLista();
    setMessageInfo("¡Ticket asignado con éxito!");
    setChecked(true);
  };

  const handleFinalizar = async (ticket) => {
    const data = { id: ticket._id };
    const data2 = { imgUrl: ticket.imgUrl };
    await finalizarTicket(data);

    if (imgUrl != "null") {
      await postDeleteImgs(data2);
    }
    actualizarLista();

    setMessageInfo("¡Ticket finalizado con éxito!");
    setChecked(true);
  };

  return (
    <>
      <Header />
      <section className="w-full select-none min-w-[383px]">
        <div className="flex justify-between items-center">
          <div className="ml-5 md:ml-20 md:flex items-center my-[30px] text-[#676F7B]">
            {!administrador ? (
              <p className="font-medium text-[20px]">
                Historial de mis Tickets
              </p>
            ) : (
              <p className="font-medium text-[20px]">Gestionar Tickets</p>
            )}
            <p className="-mt-[3px] md:ml-3 font-light text-[13px]">
              {user && (
                <>
                  {
                    tickets.filter((ticket) => ticket.namePC === user.nombrePC)
                      .length
                  }{" "}
                  tickets
                </>
              )}
            </p>
          </div>
          <div className="flex h-[50px] w-[140px] sm:w-[300px] text-[14px] text-[#676F7B] mr-5 md:mr-[30px] border border-[#b3b3b3] px-5 py-2 rounded-md focus:outline-none">
            <img src={buscar} alt="" className="w-[16px] h-full" />

            <input
              type="text"
              placeholder="Buscar por № Ticket..."
              value={searchTicket}
              onChange={(e) => setSearchTicket(e.target.value)}
              className="w-full px-5 py-2 focus:outline-none"
            />
          </div>
        </div>
        <section className="w-full sm:justify-start overflow-scroll  lg:overflow-hidden flex md:justify-center py-5 px-30 h-auto border-t-[1px] border-[#d4d4d4]">
          <table className="text-[13px] text-[#676F7B]">
            <thead>
              <tr>
                <th className="px-2 py-1 text-center font-medium">N° TICKET</th>
                <th className="px-2 py-2 text-start font-medium">
                  ASUNTO REQUERIMIENTO
                </th>
                <th className="px-2 py-1 text-center font-medium">
                  COLABORADOR SOLICITANTE
                </th>
                <th className="px-2 py-1 text-center font-medium">
                  ETIQUETA CATÁLOGO
                </th>
                <th className="px-2 py-1 text-center font-medium">ESTADO</th>
                <th className="px-2 py-1 text-center font-medium">
                  USUARIO RESPONSABLE
                </th>
                <th className="px-2 py-1 text-center font-medium">
                  FECHA CREACIÓN
                </th>
                <th className="px-2 py-1 text-center font-medium">
                  FECHA FINALIZACIÓN
                </th>

                {!administrador ? (
                  <>
                    <th className="px-2 py-1 text-center font-medium">
                      CANCELAR
                    </th>
                    <th className="px-2 py-1 text-center font-medium">
                      DETALLE TICKET
                    </th>
                  </>
                ) : (
                  <th className="px-2 py-1 text-center font-medium"></th>
                )}
              </tr>
            </thead>
            <tbody className="font-light">
              {user ? (
                <>
                  {administrador === true ? (
                    <>
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket, index) => (
                          <tr className="hover:bg-[#f2f2f2]" key={index}>
                            <td className="h-auto text-center">
                              {String(ticket.numeroTicket).padStart(4, "0")}
                            </td>
                            <td className="max-w-[300px] h-auto text-start ">
                              {ticket.detail}
                            </td>
                            <td className="h-auto text-center">
                              {ticket.namePC}
                            </td>
                            <td className="h-auto px-3 py-1 text-center">
                              {ticket.incidencia}
                            </td>
                            <td className="h-auto px-2 py-1 text-center">
                              {ticket.estado}
                            </td>
                            <td className="h-auto text-center">
                              {ticket.asignado}
                            </td>
                            <td className="h-auto px-1 py-2 text-center">
                              {new Date(ticket.createdAt).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}{" "}
                              {new Date(ticket.createdAt).toLocaleTimeString(
                                "es-ES",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </td>
                            <td className="h-auto px-1 py-2 text-center">
                              {ticket.estado === "FINALIZADO" && (
                                <>
                                  {new Date(
                                    ticket.updatedAt
                                  ).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })}{" "}
                                  {new Date(
                                    ticket.updatedAt
                                  ).toLocaleTimeString("es-ES", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </>
                              )}
                            </td>
                            <td className="h-auto text-center">
                              {ticket.estado === "PENDIENTE" && (
                                <button
                                  className="flex text-[12px] items-center gap-4 rounded-md text-[#fff] px-[19px] py-[7px] my-1 bg-[#0367C7] hover:opacity-95"
                                  onClick={() => handleObservar(ticket)}
                                >
                                  <img
                                    src={buton_solicitar}
                                    className="w-[20px]"
                                  />
                                  <p>Atender Ticket</p>
                                </button>
                              )}
                              {ticket.estado === "EN CAMINO" && (
                                <button
                                  className="flex text-[12px] items-center gap-4 rounded-md text-[#fff] px-[19px] py-[7px] my-1 bg-[#0367C7] hover:opacity-95"
                                  onClick={() => handleFinalizar(ticket)}
                                >
                                  <img
                                    src={buton_solicitar}
                                    className="w-[20px]"
                                  />
                                  <p>Finalizar</p>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center py-4">
                            No hay tickets disponibles.
                          </td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <>
                      {filteredTickets.length > 0 ? (
                        filteredTickets
                          .filter((ticket) => ticket.namePC === user.nombrePC)
                          .map((ticket, index) => (
                            <tr className="hover:bg-[#f2f2f2]" key={index}>
                              <td className="h-auto text-center">
                                {String(ticket.numeroTicket).padStart(4, "0")}
                              </td>
                              <td className="max-w-[300px] h-auto text-start ">
                                {ticket.detail}
                              </td>
                              <td className="h-auto text-center">
                                {ticket.namePC}
                              </td>
                              <td className="h-auto px-3 py-1 text-center">
                                {ticket.incidencia}
                              </td>
                              <td className="h-auto px-2 py-1 text-center">
                                {ticket.estado}
                              </td>
                              <td className="h-auto text-center">
                                {ticket.asignado}
                              </td>
                              <td className="h-auto px-1 py-2 text-center">
                                {new Date(ticket.createdAt).toLocaleDateString(
                                  "es-ES",
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  }
                                )}{" "}
                                {new Date(ticket.createdAt).toLocaleTimeString(
                                  "es-ES",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </td>
                              <td className="h-auto px-1 py-2 text-center">
                                {ticket.estado === "FINALIZADO" && (
                                  <>
                                    {new Date(
                                      ticket.updatedAt
                                    ).toLocaleDateString("es-ES", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                    })}
                                    {new Date(
                                      ticket.updatedAt
                                    ).toLocaleTimeString("es-ES", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </>
                                )}
                              </td>
                              <td className="h-auto text-center">
                                {ticket.estado === "PENDIENTE" && (
                                  <button
                                    className="w-[25px] h-[25px] p-0"
                                    onClick={() =>
                                      cancelarTicketModal(
                                        ticket._id,
                                        ticket.imgUrl
                                      )
                                    }
                                  >
                                    <img
                                      src={exit}
                                      alt=""
                                      className="w-[12px] h-full shover:scale-125"
                                    />
                                  </button>
                                )}
                              </td>
                              <td className="h-auto text-center">
                                {ticket.estado === "PENDIENTE" ||
                                ticket.estado === "EN CAMINO" ? (
                                  <button
                                    className="w-[25px] h-[25px] p-0"
                                    onClick={() => handleObservar(ticket)}
                                  >
                                    <img
                                      src={buscar}
                                      alt=""
                                      className="w-[16px] h-full hover:scale-125"
                                    />
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center py-4">
                            No hay tickets disponibles.
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </>
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No hay tickets disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Modal Detalle Ticket */}
        {modalOpen && (
          <>
            {administrador ? (
              // MODAL ADMINISTRADOR - ATENDER TICKET
              <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-[100vh] bg-[#00000082] overflow-hidden">
                <section className="px-10 lg:px-20 h-auto bg-[#fff] flex flex-col items-center mx-10 sm:mx-20 lg:mx-28 py-6 md:py-10 text-[#797979] text-[14px] font-light">
                  <div className="w-full flex mb-8 items-center justify-between">
                    <p className="text-[18px] font-medium">
                      Detalle Ticket: admin
                    </p>
                    <img
                      src={exit}
                      className="hover:rotate-12 cursor-pointer"
                      onClick={() => detalleModal()}
                    />
                  </div>
                  <section className="sm:flex justify-center items-center">
                    <div className="w-100vh h-full lg:px-30 grid gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-[150px_1fr]">
                      <p className="font-normal">TICKET:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={String(nTicket).padStart(4, "0")}
                      />
                      <p className="font-normal">SOLICITANTE:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={nombrePC}
                      />
                      <p className="font-normal">FECHA DE REGISTRO:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={fechaCreacion}
                      />
                      <p className="font-normal">ASUNTO:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={incidencia}
                      />

                      <p className="font-normal">ESTADO:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={estado}
                      />
                      <p className="font-normal">FIRMA IP:</p>
                      <input
                        disabled
                        type="text"
                        className="bg-white"
                        value={ipPriv}
                      />
                      <p className="font-normal">DETALLE:</p>
                      <textarea
                        name="detalle"
                        disabled
                        className="bg-white w-full sm:w-[150px] h-auto sm:h-[100px]"
                        value={detalle}
                      ></textarea>
                      <div className="flex font-normal items-center">
                        <p>RESPONSABLE:</p>
                        <span className="ml-2 text-[#f00]">*</span>
                      </div>
                      <select
                        value={asignado}
                        required
                        onChange={(e) => setAsignado(e.target.value)}
                        className="border p-3 w-full rounded-md focus:outline-none"
                      >
                        <option value="">Selecciona el responsable</option>
                        <option value={VITE_INFORMATICO}>
                          {VITE_INFORMATICO}
                        </option>
                        <option value={VITE_INFORMATICO2}>
                          {VITE_INFORMATICO2}
                        </option>
                        <option value={VITE_INFORMATICO3}>
                          {VITE_INFORMATICO3}
                        </option>
                        <option value={VITE_INFORMATICO4}>
                          {VITE_INFORMATICO4}
                        </option>
                      </select>
                      <div></div>
                      <button
                        className="flex text-[12px] items-center gap-4 rounded-md text-[#fff] px-[15px] py-[13px] my-1 bg-[#0367C7] hover:opacity-95"
                        onClick={() => handleAsignarResponsable()}
                      >
                        <img src={buton_solicitar} className="w-[20px]" />
                        <p className="text-start">Asignar responsable</p>
                      </button>
                    </div>
                    {imgUrl != "null" && (
                      <div className="w-full flex justify-center items-center sm:w-[450px] h-[20vh] sm:h-[300px] sm:m-4">
                        <ZoomImage src={imgUrl} />
                      </div>
                    )}
                  </section>
                </section>
              </div>
            ) : (
              // MODAL USUARIO - VER DETALLE DE TICKET
              <>
                <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-[100vh] bg-[#00000082] overflow-hidden">
                  <section className="px-10 lg:px-20 h-auto bg-[#fff] flex flex-col items-center mx-10 sm:mx-20 lg:mx-28 py-6 md:py-10 text-[#797979] text-[14px] font-light">
                    <div className="w-full flex mb-8 items-center justify-between">
                      <p className="text-[18px] font-medium">Detalle Ticket:</p>
                      <img src={exit} onClick={() => detalleModal()} />
                    </div>
                    <section className="sm:flex justify-center items-center">
                      <div className="w-100vh h-full lg:px-30 grid gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-[150px_1fr]">
                        <p className="font-normal">TICKET:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={String(nTicket).padStart(4, "0")}
                        />
                        <p className="font-normal">SOLICITANTE:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={nombrePC}
                        />
                        <p className="font-normal">FECHA DE REGISTRO:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={fechaCreacion}
                        />
                        <p className="font-normal">ASUNTO:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={incidencia}
                        />
                        <p className="font-normal">DETALLE:</p>
                        <textarea
                          name="detalle"
                          disabled
                          className="bg-white w-full sm:w-[150px] h-auto sm:h-[100px]"
                          value={detalle}
                        ></textarea>
                        <p className="font-normal">ASIGNADO:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={asignado}
                        />
                        <p className="font-normal">ESTADO:</p>
                        <input
                          disabled
                          type="text"
                          className="bg-white"
                          value={estado}
                        />
                        <p className="mt-[10px] lg:mt-[90px] font-normal">
                          FIRMA IP:
                        </p>
                        <input
                          disabled
                          type="text"
                          className="mt-[10px] bg-white lg:mt-[90px]"
                          value={ipPriv}
                        />
                      </div>
                      <div className="w-full flex justify-center items-center sm:w-[450px] h-[20vh] sm:h-[300px] sm:m-4">
                        <img
                          src={imgUrl}
                          alt=""
                          className="rounded-md hover:scale-150 transition-transform duration-500"
                        />
                      </div>
                    </section>
                  </section>
                </div>
              </>
            )}
          </>
        )}
        {/* Modal Cancelar Ticket */}
        {modalOpencancel == true ? (
          <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-[100vh] bg-[#00000082] overflow-hidden">
            <section className="px-10 lg:px-18 h-auto bg-[#fff] flex flex-col items-center mx-10 sm:mx-15 lg:mx-20 py-6 md:py-10 text-[#797979] text-[14px] font-light">
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-medium">Cancelar Ticket:</p>
                <img src={exit} onClick={() => cancelarTicketModal()} />
              </div>
              <div className="w-full mt-5 h-full lg:px-30">
                <p className="font-normal">
                  ¿Estas seguro que desea cancelar el ticket?
                </p>
              </div>
              <button
                className="flex text-[13px] mt-[25px] items-center gap-4 rounded-sm text-[#fff] px-[80px] py-[10px] bg-[#0367C7] hover:opacity-95"
                onClick={() => cancelarTicketFunction(id)}
              >
                <img src={buton_cancelar} className="w-[20px]" />
                <p>Aceptar</p>
              </button>
            </section>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default HistorialTicket;
