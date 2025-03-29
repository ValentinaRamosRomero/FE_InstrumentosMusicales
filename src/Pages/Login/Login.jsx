import React, { useState } from "react";
import "./Login.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isAuthenticated, userData, onLogin, onLogout }) => {
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
        console.log("Inicio de sesión exitoso:", responseLoginData);

        localStorage.setItem("email", email)
        //peticion para guardar las iniciales del usuario
        const responseUser = await axios.post(
          import.meta.env.VITE_API_URL + "/users/find-by-email",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${responseLoginData.token}`,
            },
          }
        );

        if(responseUser.status === 200){
         const{ firstName, lastName } = responseUser.data.data;

         // Obtener las iniciales
          const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

          // Guardar las iniciales en el localStorage
          localStorage.setItem('iniciales', initials);

          console.log("Iniciales guardadas en localStorage:", initials);
      }else{
        throw new Error("Error al buscar Usuario")
      }

        onLogin(
          responseLoginData.token,
          JSON.stringify({ ...responseLoginData })
        );

        // Redirigir según el rol del usuario
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
        onLogout={onLogout}
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
            {errors.correo && (
              <span className="error-message">❌{errors.correo.message}</span>
            )}

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
