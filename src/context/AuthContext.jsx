import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Valido si el token que tiene el el localsotrage es valido
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newUser = response.data.data.user
      setUser(response.data.data.user);
      navigate("/workspaces"); 
    } catch (error) {
      console.error("Error al verificar autenticacion:", error);
    } finally {
      setLoading(false);
    }
  };

  //Inicio sesion
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    navigate("/workspaces"); 
  };
  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); 
  };
  //Cada vez que arranque la aplicacion validamos el token
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
