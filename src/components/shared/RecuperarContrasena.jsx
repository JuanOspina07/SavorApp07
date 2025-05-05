import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "../Styles/Registro.css";

const RecuperarContrasena = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/recuperar", { correo });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "¡Correo enviado!",
          text: "Se ha enviado un enlace de recuperación a tu correo electrónico.",
          confirmButtonText: "Entendido",
          customClass: {
            confirmButton: "mi-boton-confirmacion"
          }}).then(() => {
          navigate("/login");
        });
      } else {
        setMensaje(response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ocurrió un error al enviar el enlace de recuperación.",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  return (
    <div className="PaginaRegistro">
      <button className="Lr" onClick={() => navigate("/login")}>
        <img src="Flecha.png" alt="Volver" />
      </button>

      <img className="ima12" src="SAV.png" alt="Logo 1" />
      <img className="ima13" src="OR.png" alt="Logo 2" />
      <img className="ima14" src="A.png" alt="Logo 3" />

      <div className="container2">
        <form onSubmit={handleEmailSubmit}>
          <h2>Recuperación de Contraseña</h2>

          <div className="UserBox2">
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="inputfield2"
            />
            <label className="label2">Correo</label>
          </div>

          {mensaje && <p className="mensaje-error">{mensaje}</p>}

          <button className="btresg" type="submit">
            Enviar Enlace de Recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
