import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getReservationSchedule = async (id, date) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const response = await axios.get(
      `${API_URL}/reservation/schedule?workspace_id=${id}&date=${date}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el horario."
    );
  }
};

export const storeReservation = async (
  workspace_id,
  date,
  start_time,
  end_time
) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const response = await axios.post(
      `${API_URL}/reservation`,
      {
        workspace_id,
        date,
        start_time,
        end_time,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el horario."
    );
  }
};

export const getUserReservations = async (page) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await axios.get(`${API_URL}/reservation?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener reservas:", error.response?.data);
    return [];
  }
};

export const getReservationsPending = async (page=1) => {
  try {
    const response = await axios.get(`${API_URL}/reservation/pending?page=${page}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data; // Asegúrate de que el backend devuelve `data`
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    throw error;
  }
};

export const updateReservationStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/reservation/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    throw error;
  }
};