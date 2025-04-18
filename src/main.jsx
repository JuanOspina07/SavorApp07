// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./components/shared/Login";
import Registro from "./components/shared/Registro";
import RecuperarContrasena from "./components/shared/RecuperarContrasena";
import RestablecerContrasena from "./components/shared/RestablecerContrasena"; // ✅ Este era el que faltaba
import "./index.css";

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idRol, setIdRol] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const rol = localStorage.getItem("idRol");

    setIsAuthenticated(auth);
    setIdRol(rol ? parseInt(rol) : null);
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/RecuperarContraseña" element={<RecuperarContrasena />} />
            <Route path="/recuperar/:token" element={<RecuperarContrasena />} />
            <Route path="/restablecer/:token" element={<RestablecerContrasena />} /> {/* ✅ Ruta corregida */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {idRol === 1 && <Route path="/menu" element={<App setAuth={setIsAuthenticated} />} />}
            {idRol === 2 && <Route path="/menu" element={<App setAuth={setIsAuthenticated} />} />}
            {idRol === 3 && <Route path="/cocinero" element={<CocineroPage />} />}
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    idRol === 1 ? "/menu" :
                    idRol === 2 ? "/menu" :
                    idRol === 3 ? "/cocinero" : "/"
                  }
                />
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
