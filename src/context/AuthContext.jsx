import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  capturarDatos,
  postUpload,
  postCreateTicket,
  getListarTickets,
  postCancelarTicket,
  postAsignarResponsable,
  postFinalizarTicket,
  menssageService,
  postDeleteImg,
} from "../Services/auth";

import socket from "../Services/socket";
const NOMBRE_PC_ADMIN = import.meta.env.VITE_NOMBRE_PC_ADMIN;
const NOMBRE_PC_ADMIN2 = import.meta.env.VITE_NOMBRE_PC_ADMIN2;
const NOMBRE_PC_ADMIN3 = import.meta.env.VITE_NOMBRE_PC_ADMIN3;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [administrador, setAdministrador] = useState(false);
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");

  // CAPTURAR DATOS DEL PC
  const capturaDatos = async () => {
    try {
      const response = await capturarDatos();
      setUser(response);
      if (
        response.nombrePC === NOMBRE_PC_ADMIN ||
        response.nombrePC === NOMBRE_PC_ADMIN2 ||
        response.nombrePC === NOMBRE_PC_ADMIN3
      ) {
        setAdministrador(true);
      }
      return response;
    } catch (error) {
      console.error("Error al capturar:", error);
    }
  };

  const uploadImge = async (formData) => {
    try {
      const response = await postUpload(formData);
      return response.url;
    } catch (error) {
      console.error("Error al cargar imagen:", error);
    }
  }; 
  const postDeleteImgs = async (data) => {
    try {
      const response = await postDeleteImg(data);
      return response;
    } catch (error) {
      console.error("Error al eliminar img:", error);
    }
  };
  const createTicket = async (data) => {
    try {
      const response = await postCreateTicket(data);
      return response;
    } catch (error) {
      console.error("Error al cargar ticket:", error);
    }
  };

  const listarTickets = async () => {
    try {
      const response = await getListarTickets();
      setTickets(response);
    } catch (error) {
      console.error("Error al cargar ticket:", error);
    }
  };

  const cancelarTicket = async (data) => {
    try {
      const response = await postCancelarTicket(data);
      return response;
    } catch (error) {
      console.error("Error al cancelar ticket:", error);
    }
  };

  const asignarResponsable = async (data) => {
    try {
      const response = await postAsignarResponsable(data);
      return response;
    } catch (error) {
      console.error("Error al asignar responsable ticket:", error);
    }
  };

  const finalizarTicket = async (data) => {
    try {
      const response = await postFinalizarTicket(data);
      return response;
    } catch (error) {
      console.error("Error al finalizar ticket:", error);
    }
  };

  const menssageServices = async (text) => {
    try {
      const response = await menssageService(text);
      return response;
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  useEffect(() => {
    socket.on("ticketChange", () => {
      setUpdate(true);
    });

    return () => {
      socket.off("ticketChange");
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        capturaDatos,
        createTicket,
        uploadImge,
        listarTickets,
        cancelarTicket,
        tickets,
        setTickets,
        administrador,
        setAdministrador,
        setChecked,
        checked,
        asignarResponsable,
        finalizarTicket,
        menssageServices,
        setUpdate,
        update,
        setMessageInfo,
        messageInfo,
        postDeleteImgs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
