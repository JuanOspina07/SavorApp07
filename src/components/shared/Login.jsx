import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

// fjhdwiufhwei
function Login({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    setAuth(true);
  };

  return (
    <div className="PaginaInicio">
      <img className="Fondo" src="SAVORA.png" alt="Logo Savora" />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="UserBox">
            <input type="text" required className="inputfield" />
            <label>UserName</label>
          </div>
          <div className="UserBox">
            <input type="password" required minLength="12" className="inputfield" />
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
