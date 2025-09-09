import logo from "../assets/logo-horizontal.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import menu_icon from "../assets/menu.svg";
import exit from "../assets/exit_movile.svg";
import { useAuth } from "../context/AuthContext";
function CustomLink({ to, label }) {
  const location = useLocation();
  const isHovered = location.pathname === to;
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <p
        className={`text-[#676F7B] font-light hover:font-normal ${
          isActive ? "text-[#71A1AA] font-normal" : isHovered ? "" : ""
        }`}
      >
        {label}
      </p>
    </Link>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const { administrador, checked, setChecked, messageInfo, setMessageInfo } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 697px)");
    setOpen(false);
    const checkScreenSize = (e) => {
      if (e.matches) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    checkScreenSize(mediaQuery);
    mediaQuery.addEventListener("change", checkScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", checkScreenSize);
    };
  }, []);

  // Crear ticket | Cancelar Ticket | Asignar Ticket | Finalizar Ticket

  useEffect(() => {
    if (checked) {
      const timer = setTimeout(() => {
        setChecked(false);
        setMessageInfo("")
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [checked, setChecked]);

  //min-w-[383px]

  return (
    <>
      <section className="w-auto flex justify-between items-center mx-3 sm:mx-[30px] select-none">
        <div className="bg-[#fff] h-[90px] text-[13px] flex gap-4 items-center font-light">
          <img src={logo} className="w-[130px] md:w-[200px] mr-[20px]" />

          {!navbar && (
            <>
              {administrador ? (
                <>
                  <p className="text-[#676F7B] font-extrabold">
                    ADMINISTRADOR UFTI
                  </p>
                  <div className="w-[1.5px] h-[25px] bg-[#858585] mx-[20px]"></div>
                  <CustomLink
                    to="/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg"
                    label="Gestionar Tickets"
                  />
                </>
              ) : (
                <>
                  <p className="text-[#676F7B]">SERVICIOS DE UFTI</p>
                  <div className="w-[1.5px] h-[25px] bg-[#858585] mx-[20px]"></div>
                  <CustomLink
                    to="/home/catalog/XkR7qLpM9aZbVnF2tG4cHy"
                    label="Catálogo"
                  />
                  <CustomLink
                    to="/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg"
                    label="Historial de mis tickets"
                  />
                </>
              )}
            </>
          )}
        </div>

        {open && (
          <div className="h-auto fixed top-[60px] right-0 flex flex-col border-[1px] bg-[#ffffff] p-[20px] gap-1">
            <CustomLink
              to="/home/catalog/XkR7qLpM9aZbVnF2tG4cHy"
              label="Catálogo"
            />
            <CustomLink
              to="/home/ticket_history/mN3tQvPzL8jYfWcR5xHaSg"
              label="Historial de mis tickets"
            />
            <div className="w-full h-[1px] my-3 bg-[#e2e2e2]"></div>
          </div>
        )}
        {navbar && (
          <button
            className="fixed top-11 right-5 lg:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            {open ? (
              <img src={exit} alt="" className="w-[13px] animate-pulse" />
            ) : (
              <img src={menu_icon} alt="" className="w-[13px]" />
            )}
          </button>
        )}
      </section>
      {checked && (
        <div className="w-full h-[40px] bg-[#D4EDDA] text-[#155724] flex justify-center items-center text-[13px] font-light">
          <p>{messageInfo}</p>
        </div>
      )}
    </>
  );
};

export default Header;
