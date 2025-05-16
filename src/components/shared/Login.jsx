import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../Styles/Login.css";

function Login({ setAuth }) {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        nombreUsuario,
        contraseña,
      });

      if (response.data.success) {
        const { idUsuario,idRol, nombre, apellido } = response.data.user;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("idUsuario", idUsuario);
        localStorage.setItem("idRol", idRol);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);

        setAuth(true);
        window.location.reload();

        switch (idRol) {
          case 1:
            navigate("/menu");
            break;
          case 2:
            navigate("/PaginaAdmin");
            break;
          case 3:
            navigate("/PaginaCocinero");
            break;
          default:
            setError("Rol no reconocido");
            return;
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="PaginaInicio">
      <img className="Fondo" src="SAVORA.png" alt="Logo Savora" />
      <div className="ContainerLogin">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="UserBox">
            <input
              type="text"
              required
              className="inputfield"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <label>UserName</label>
          </div>
          <div className="UserBox">
            <input
              type="password"
              required
              className="inputfield"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <label>Password</label>
            
          </div>
          <button className="button1" type="submit">Sign in</button>
          <p className="link2">
            ¿Olvidaste tu contraseña?
            <span
              className="registro-link"
              onClick={() => navigate("/RecuperarContraseña")}
              style={{ color: "#d4af37", cursor: "pointer" }}
            >  Recuperala
            </span>
          </p>
          <p className="link">¿No tienes cuenta?   <span
              className="registro-link"
              onClick={() => navigate("/Registro")}
              style={{ color: "#d4af37", cursor: "pointer" }}
            >  Regístrate
            </span>
          </p>
         
        </form>
      </div>

      {/* MODAL DE ERROR */}
      {error && (
        <div className="modal-error">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={() => setError("")}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
