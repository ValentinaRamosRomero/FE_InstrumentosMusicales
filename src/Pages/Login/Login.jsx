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
      const { email, password } = data;

      const responseLogin = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (responseLogin.status === 200) {
        const responseLoginData = responseLogin.data.data;
        const token = responseLoginData.token;

        console.log("Inicio de sesión exitoso:", responseLoginData);

        // Guardar el token y email
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        // Obtener datos del usuario
        const responseUser = await axios.post(
          import.meta.env.VITE_API_URL + "/users/find-by-email",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseUser.status === 200) {
          const { firstName, lastName } = responseUser.data.data;

          // Guardar info en localStorage
          localStorage.setItem("nombre", firstName);
          localStorage.setItem("apellido", lastName);
          localStorage.setItem("iniciales", `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`);

          console.log("Datos del usuario guardados en localStorage:");
          console.log("Nombre:", firstName);
          console.log("Apellido:", lastName);
        } else {
          throw new Error("Error al obtener los datos del usuario");
        }

        // Enviar token e info al estado global si usas contexto o props
        onLogin(token, JSON.stringify({ ...responseLoginData }));

        // Redireccionar según rol
        if (responseLoginData.role === "USER") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      } else {
        throw new Error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en login:", error);
      const mensajeError =
        error.response?.data?.message || "Error en el inicio de sesión";
      setErrorMessage(mensajeError);
    }
  });

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={() => {}}
      />
      <div className="back">
        <div className="login">
          <h2>INICIAR SESIÓN</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Correo es requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">❌{errors.email.message}</span>
            )}

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "Contraseña es requerida" },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className="error-message">❌{errors.password.message}</span>
            )}

            {errorMessage && (
              <div className="error-message">❌{errorMessage}</div>
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
