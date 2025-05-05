import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Registro.css";

const RestablecerContrasena = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:4000/restablecer/${token}`)
      .then((response) => {
        if (response.data.success) {
          setTokenValido(true);
          Swal.fire({
            icon: "info",
            title: "Token válido",
            text: "Puedes restablecer tu contraseña ahora.",
            confirmButtonColor: "#e67e22"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Token inválido o expirado",
            text: "El enlace ya no es válido. Solicita uno nuevo.",
            confirmButtonColor: "#e74c3c"
          }).then(() => {
            navigate("/recuperar");
          });
        }
      })
      .catch((error) => {
        console.error("Error al verificar el token:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Hubo un problema al verificar el token.",
          confirmButtonColor: "#e74c3c"
        }).then(() => {
          navigate("/recuperar");
        });
      });
  }, [token, navigate]);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/restablecer-contrasena", {
        token,
        nuevaContrasena,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "¡Contraseña actualizada!",
          text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
          confirmButtonColor: "#27ae60"
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "No se pudo actualizar la contraseña.",
          confirmButtonColor: "#e74c3c"
        });
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un problema al actualizar la contraseña.",
        confirmButtonColor: "#e74c3c"
      });
    }
  };

  return (
    <div className="PaginaRegistro">
      <img className="ima12" src="https://i.ibb.co/Pvt8CBD1/SAV.png" alt="Logo 1" />
      <img className="ima13" src="https://i.ibb.co/1fMd82hg/OR.png" alt="Logo 2" />
      <img className="ima14" src="https://i.ibb.co/sv2NwLns/A.png" alt="Logo 3" />
      <div className="container2">
        <h2>Restablecer Contraseña</h2>

        {tokenValido && (
          <form onSubmit={handlePasswordReset}>
            <div className="UserBox2">
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required
                className="inputfield2"
              />
              <label className="label2">Nueva Contraseña</label>
            </div>

            <button className="btresg" type="submit">
              Actualizar Contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RestablecerContrasena;
