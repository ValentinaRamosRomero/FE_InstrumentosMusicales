import React, { useState } from "react";
import "./Login.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated, userData, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { correo, password } = data;

      const response = await axios.post(
        "https://tu-backend.com/api/login",
        { correo, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("Inicio de sesión exitoso:", response.data);
      }

      /*localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));*/

      // Llamamos a la función de login recibida como prop
      onLogin(response.data.token, response.data.usuario);

      // Redirigir al home personalizado
      if (response.data.usuario.id) {
        navigate(`/home/${response.data.usuario.id}`); // Corrección del uso de template literals
      } else {
        navigate("/");
      }
      
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error en el inicio de sesión";
      setErrorMessage(mensajeError);
    }
  });

  return (
    <>
      <Header isAuthenticated={isAuthenticated} userData={userData} onLogout={() => {}} />
      <div className="back">
        <div className="login">
          <h2>INICIAR SESIÓN</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              {...register("correo", {
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && <span>{errors.correo.message}</span>}

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "Contraseña es requerida" },
                minLength: {
                  value: 6,
                  message: "Password debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;