import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/Registro.css";

const RestablecerContrasena = () => {
  const { token } = useParams(); // Obtener el token desde la URL
  const navigate = useNavigate();

  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    // Verificar si el token es válido al cargar el componente
    axios.get(`http://localhost:4000/restablecer/${token}`)
      .then((response) => {
        if (response.data.success) {
          setTokenValido(true);
          setMensaje(response.data.message);
        } else {
          setMensaje("Token inválido o expirado");
        }
      })
      .catch((error) => {
        console.error("Error al verificar el token:", error);
        setMensaje("Hubo un error al verificar el token");
      });
  }, [token, navigate]);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/restablecer-contrasena", {
        token, // Enviar el token al backend
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
    <div  className="PaginaRegistro">
      <img className="ima12"src="https://i.ibb.co/Pvt8CBD1/SAV.png" alt="Logo 1" />
      <img className="ima13" src="https://i.ibb.co/1fMd82hg/OR.png"  alt="Logo 2" />
      <img className="ima14"  src="https://i.ibb.co/sv2NwLns/A.png" alt="Logo 3" />
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
