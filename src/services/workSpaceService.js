import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getWorkspaces = async (page = 1) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const response = await axios.get(`${API_URL}/workspace?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los workspaces."
    );
  }
};

export const getWorkspaceById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await axios.get(`${API_URL}/workspace/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el workspace."
    );
  }
};


  
