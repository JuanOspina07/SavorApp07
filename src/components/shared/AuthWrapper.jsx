import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../shared/Login";
import Registro from "../shared/Registro";
import App from "../../App";

function AuthWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />{" "}
          {/* Ahora carga primero Login */}
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<App />} />{" "}
          {/* Ahora carga App solo si está autenticado */}
          <Route path="/Menu" element={<App />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default AuthWrapper;
