import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importar axios para hacer peticiones
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
      console.log(setError('ERROR'))

      if (response.data.success) {
        const { idRol } = response.data.user;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("idRol", idRol);
        setAuth(true);

        if (idRol === 1) {
          navigate("/productos");
        } else if (idRol === 2) {
          navigate("/admin");
        } else if (idRol === 3) {
          navigate("/cocinero");
        } else {
          setError("Rol no reconocido");
        }
      } else {
        setError(response.data.message);
      }
    }  catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="PaginaInicio">
      <img className="Fondo" src="SAVORA.png" alt="Logo Savora" />
      <div className="ContainerLogin">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
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
          <p className="link">
            ¿No tienes cuenta?{" "}
            <span
              className="registro-link"
              onClick={() => navigate("/Registro")}
              style={{ color: "#d4af37", cursor: "pointer" }}
            >
              Regístrate
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
