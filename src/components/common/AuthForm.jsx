import { useContext, useState } from "react";
import { login, register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
//Formulario register y login
const AuthForm = ({ isRegister = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {user,login:authLogin} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      let response;
      console.log(formData)
      if (isRegister) {
        response = await register(formData);
      } else {
        response = await login(formData);
      }
      const token = response.data.token;
      authLogin(token, response.data.user);
      navigate("/workspaces");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-zinc-900 rounded-lg shadow-md h-fit max-w-[22rem]"
    >
      <h1 className="text-white text-2xl">
        {isRegister ? "Registrarse" : "Iniciar sesion"}
      </h1>
      {isRegister && (
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md border-white text-white"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded-md border-white text-white"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded-md border-white text-white"
      />
      {isRegister && (
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmar contraseña"
          value={formData.password_confirmation}
          onChange={handleChange}
          className="w-full p-2 border rounded-md border-white text-white"
        />
      )}

      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-zinc-700 text-white p-2 rounded-md cursor-pointer"
      >
        {isRegister ? "Registrarse" : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default AuthForm;
