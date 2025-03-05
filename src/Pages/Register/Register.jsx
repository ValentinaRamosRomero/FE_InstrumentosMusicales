import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      // Convertir los datos del formulario a un objeto JSON
      const jsonData = { ...data };
      /*const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });*/

      const response = await axios.post(
        "https://music-store-api.up.railway.app/auth/register",
        jsonData,
        //formData,
        {
          headers: { Accept: "application/json" }, // Axios manejará multipart/form-data automáticamente
        }
      );

      if (response.status === 200) {
        console.log("Usuario registrado:", response.data);
        navigate("/login"); // Redirige al login tras el registro exitoso
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage(
        error.response?.data?.message || "Error al registrar usuario"
      );
    }
    console.log(data)
  };

  return (
    <>
      <Header />
      <div className="back_register">
        {/* Card del formulario */}
        <div className="register">
          <h2>REGISTRO</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              {...register("firstName", {
                required: true,
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: "Solo puedes ingresar letras.",
                },
              })}
            />

            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              {...register("lastName", {
                required: true,
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: "Solo puedes ingresar letras.",
                },
              })}
            />

            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Ingresa un correo electrónico válido.",
                },
              })}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener mínimo 6 caracteres.",
                },
              })}
            />

            <button type="submit">Registrarse</button>

            {/* Mensaje de error general */}
            {errorMessage && <p className="error-message">❌ {errorMessage}</p>}

            {/* Caja de errores debajo del botón */}
            {Object.keys(errors).length > 0 && (
              <div className="error-box">
                {errors.nombre && (
                  <p>
                    ❌ En los campos de nombre y apellido solo puedes ingresar
                    letras.
                  </p>
                )}
                {errors.apellido && (
                  <p>
                    ❌ En los campos de nombre y apellido solo puedes ingresar
                    letras.
                  </p>
                )}
                {errors.correo && (
                  <p>❌ Ingresa un correo electrónico válido.</p>
                )}
                {errors.password && (
                  <p>❌ La contraseña debe tener mínimo 6 caracteres.</p>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Card de Beneficios */}
        <div className="benefits-card">
          <h3>🎵 Únete a SoundKeeper y disfruta de más beneficios 🎶</h3>
          <p>
            Regístrate ahora y accede a nuestra colección de instrumentos
            musicales. Como usuario registrado, podrás:
          </p>
          <ul>
            <li>✅ Reservar instrumentos antes que nadie.</li>
            <li>✅ Rentar fácilmente con opciones flexibles.</li>
            <li>✅ Descubrir nuevos equipos y encontrar el sonido perfecto.</li>
          </ul>
          <p>📢 ¡No te quedes fuera! Crea tu cuenta y empieza a tocar.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
