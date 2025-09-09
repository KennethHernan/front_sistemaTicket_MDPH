import Header from "../Layout/Header";
import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import buton_solicitar from "../assets/save-add.svg";
import { useAuth } from "../context/AuthContext";

const HardwareIncidents = lazy(() => import("../components/HardwareIncidents"));
const SoftwareIncidents = lazy(() => import("../components/SoftwareIncidents"));
const NetworkConnectivity = lazy(() =>
  import("../components/NetworkConnectivity")
);
const PreventiveMaintenance = lazy(() =>
  import("../components/PreventiveMaintenance")
);
const UserRequests = lazy(() => import("../components/UserRequests"));
const EmailCommunications = lazy(() =>
  import("../components/EmailCommunications")
);
const DefaultOption = lazy(() => import("../Components/DefaultOption"));
const AgregarTicket = lazy(() => import("../Components/Modal-AgregarTicket"));

function HomePage() {
  const navigate = useNavigate();
  const { administrador, user, capturaDatos } = useAuth();

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

  useEffect(() => {
    if (administrador) {
      //navigate("/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg");
      navigate("/home/catalog/XkR7qLpM9aZbVnF2tG4cHy");
    }
  }, [administrador]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(null);

  const handleClick = (optionNumber) => {
    setSelectOption(optionNumber);
    abrirModal();    
  };


  const abrirModal = () => {
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className=" px-5 md:px-20">
        <p className="mb-5 md:my-[30px] font-medium text-[#676F7B] text-[20px]">
          Equipos informáticos
          <span className="ml-[10px] font-light text-[13px]">6 servicios</span>
        </p>
        <div className="flex text-[11px] md:text-[14px] text-[#676F7B] font-light">
          <p className="font-medium mr-1">INFORMACIÓN:</p>
          <p>Selecciona (1) servicio para solicitar ticket o presiona el botón para elegir mualmente.</p>
          <p className="ml-1 mb-2 text-[#f00]">*</p>
        </div>

        <section className="text-[#B3B3B3] mb-24 font-light text-[13px] grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<DefaultOption />}>
            <HardwareIncidents handleClick={() => handleClick(1)} />
          </Suspense>
          <Suspense fallback={<DefaultOption />}>
            <SoftwareIncidents handleClick={() => handleClick(2)} />
          </Suspense>
          <Suspense fallback={<DefaultOption />}>
            <NetworkConnectivity handleClick={() => handleClick(3)} />
          </Suspense>
          <Suspense fallback={<DefaultOption />}>
            <PreventiveMaintenance handleClick={() => handleClick(4)} />
          </Suspense>
          <Suspense fallback={<DefaultOption />}>
            <UserRequests handleClick={() => handleClick(5)} />
          </Suspense>
          <Suspense fallback={<DefaultOption />}>
            <EmailCommunications handleClick={() => handleClick(6)} />
          </Suspense>
        </section>
        <button
          className="flex text-[13px] items-center gap-4 fixed m-5 rounded-md text-[#fff] bottom-0 right-0 px-[55px] py-[10px] bg-[#0367C7] hover:opacity-95"
          onClick={() => handleClick(0)}
        >
          <img src={buton_solicitar} className="w-[25px]" />
          <p>Solicitar Ticket</p>
        </button>

        {/* Modal Agregar Ticket */}
        {modalOpen && (
          <Suspense fallback={<div></div>}>
            <AgregarTicket
              selectedOption={selectOption}
              cerrarModal={cerrarModal}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default HomePage;
