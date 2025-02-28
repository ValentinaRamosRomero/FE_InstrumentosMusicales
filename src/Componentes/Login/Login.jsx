import React from "react";
import "./Login.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    /*try {
      //Enviar datos al Back End
      const response = await axios.post(
        "https://tu-backend.com/api/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías manejar la respuesta, como guardar un token o redirigir al usuario
    } catch (error) {
      console.error(
        "Error en el inicio de sesión:",
        error.response?.data || error.message
      );
    }*/
  });
  return (
    <>
      <Header />
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
                /*validate: (value) => {if(value === ){return }else{return "Contraseña incorrecta"}},*/
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
