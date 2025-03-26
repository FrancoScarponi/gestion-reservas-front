import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData );
    localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error en la autenticacionn."
    );
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData );
    localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error en el registro.");
  }
};
