import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Registro.css";

const RecuperarContrasena = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de error o éxito

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/recuperar", { correo });

      if (response.data.success) {
        alert("Se ha enviado un enlace de recuperación a tu correo");
        navigate("/login");
      } else {
        setMensaje(response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      setMensaje("Ocurrió un error al enviar el enlace de recuperación");
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/restablecer-contrasena", {
        correo,
        nuevaContrasena,
      });

      if (response.data.success) {
        alert("Contraseña actualizada correctamente");
        navigate("/login");
      } else {
        setMensaje(response.data.message);
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setMensaje("Ocurrió un error al restablecer la contraseña");
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
