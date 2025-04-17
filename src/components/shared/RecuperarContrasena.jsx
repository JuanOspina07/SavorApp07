import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/Registro.css";

const RecuperarContrasena = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  // Cargar los tipos de documento desde la API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tipos-documento")
      .then((response) => setTiposDocumento(response.data))
      .catch((error) =>
        console.error("Error al obtener los tipos de documento:", error)
      );
  }, []);

  // Manejo del restablecimiento de la contraseña
  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/recuperar", {
        token,
        tipoDocumento: selectedTipoDocumento,
        numeroDocumento,
        nombreUsuario,
        correo,
        nuevaContrasena,
      });

      if (response.data.success) {
        alert("Contraseña actualizada correctamente");
        navigate("/login");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      alert("Ocurrió un error al restablecer la contraseña");
    }
  };

  return (
    <div className="PaginaRegistro">
      <button className="Lr" onClick={() => navigate("/login")}>
        <img src="Flecha.png" alt="Volver" />
      </button>
      <img className="ima12" src="SAV.png" alt="" />
      <img className="ima13" src="OR.png" alt="" />
      <img className="ima14" src="A.png" alt="" />
      <div className="container2">
        <form onSubmit={handlePasswordReset}>
          <h2>Recuperar Contraseña</h2>

          <div className="UserBox2">
            <select
              required
              className="inputfield2"
              value={selectedTipoDocumento}
              onChange={(e) => setSelectedTipoDocumento(e.target.value)}
            >
              <option value="">Seleccione un tipo de documento</option>
              {tiposDocumento.map((tipo) => (
                <option key={tipo.idTipoDocumento} value={tipo.idTipoDocumento}>
                  {tipo.Nombre}
                </option>
              ))}
            </select>
            <label className="label2"></label>
          </div>

          <div className="UserBox2">
            <input
              type="number"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
              required
              className="inputfield2"
            />
            <label className="label2">Identificación</label>
          </div>

          <div className="UserBox2">
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              className="inputfield2"
            />
            <label className="label2">Usuario</label>
          </div>

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
      </div>
    </div>
  );
};

export default RecuperarContrasena;
