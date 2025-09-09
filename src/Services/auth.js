import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_KEY_CALLME = import.meta.env.VITE_API_KEY_CALLME;
const VITE_PHONE_CALLME = import.meta.env.VITE_PHONE_CALLME;

export const capturarDatos = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE}/capturar`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en capturar");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado capturar");
    }
  }
};

export const postUpload = async (formData) => {
  try {
    const response = await axios.post(`${VITE_API_BASE}/upload`, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en cargar img");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado img cargar");
    }
  }
};

export const postCreateTicket = async (data) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE}/api/createTicket`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en cargar img");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado img cargar");
    }
  }
};

export const getListarTickets = async (data) => {
  try {
    const response = await axios.get(`${VITE_API_BASE}/api/allTicket`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en listar tickets");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado listar tickets");
    }
  }
};

export const postCancelarTicket = async (data) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE}/api/cancelTicket`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en cancelar tickets");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado cancelar tickets");
    }
  }
};

export const postAsignarResponsable = async (data) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE}/api/asignarResponsable`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.error || "Error en asignar responsable"
      );
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado asignar responsable");
    }
  }
};

export const postFinalizarTicket = async (data) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE}/api/finalizarTicket`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error al finalizar ticket");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado finalizar ticket");
    }
  }
};

export const menssageService = async (text) => {
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${VITE_PHONE_CALLME}&text=${encodeURIComponent(
      text
    )}&apikey=${VITE_API_KEY_CALLME}`;
    await axios.get(url);
    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en menssage");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado menssage");
    }
  }
};

export const postDeleteImg = async (data) => {
  try {
    const response = await axios.post(
      `${VITE_API_BASE}/deleteImg`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error en eliminar img");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error inesperado eliminar img");
    }
  }
};