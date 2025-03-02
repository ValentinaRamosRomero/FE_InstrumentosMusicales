import React from "react";
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

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      console.log("User Registered:", data);
      navigate("/login"); // Redirige a login tras el registro
    }
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
              {...register("nombre", {
                required: "El nombre es obligatorio.",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: "En los campos de nombre y apellido solo puedes ingresar letras.",
                },
              })}
            />
            {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}

            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              {...register("apellido", {
                required: "El apellido es obligatorio.",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                  message: "En los campos de nombre y apellido solo puedes ingresar letras.",
                },
              })}
            />
            {errors.apellido && <span className="error-text">{errors.apellido.message}</span>}

            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              {...register("correo", {
                required: "El correo es obligatorio.",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Ingresa un correo electrónico válido.",
                },
              })}
            />
            {errors.correo && <span className="error-text">{errors.correo.message}</span>}

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria.",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener mínimo 6 caracteres.",
                },
              })}
            />
            {errors.password && <span className="error-text">{errors.password.message}</span>}

            <button type="submit">Registrarse</button>

            {/* Caja de errores debajo del botón */}
            {Object.keys(errors).length > 0 && (
              <div className="error-box">
                {errors.nombre && <p>❌ En los campos de nombre y apellido solo puedes ingresar letras.</p>}
                {errors.apellido && <p>❌ En los campos de nombre y apellido solo puedes ingresar letras.</p>}
                {errors.correo && <p>❌ Ingresa un correo electrónico válido.</p>}
                {errors.password && <p>❌ La contraseña debe tener mínimo 6 caracteres.</p>}
              </div>
            )}
          </form>
        </div>

        {/* Card de Beneficios */}
        <div className="benefits-card">
          <h3>🎵 Únete a SoundKeeper y disfruta de más beneficios 🎶</h3>
          <p>Regístrate ahora y accede a nuestra colección de instrumentos musicales. Como usuario registrado, podrás:</p>
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
