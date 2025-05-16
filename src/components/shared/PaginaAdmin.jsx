import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoNotificationsOutline } from "react-icons/io5";
import "../Styles/PaginaAdmin.css";

export function PaginaAdmin({ setAuth }) {

  const navigate = useNavigate();
  const [notificacionesVisible, setNotificacionesVisible] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/", { replace: true });
  };

  const handleVerStock = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/VerStock", { replace: true });
  };

  const handleAñadirProductos = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/añadirProductos", { replace: true });
  };

  const handleEliminarProducto = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/EliminarProducto", { replace: true });
  };

  const handleVerEstadisticas = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/VerEstadisticas", { replace: true });
  };

  const toggleNotificaciones = () => {
    setNotificacionesVisible(prev => !prev); // Cambia el estado para mostrar/ocultar el modal
  };

  return (
    <div className="PaginaCocinero">
      <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
      <img className="Fondo777" src="Queso1.png" alt="Fondo Cocinero" />
      <img className="Fondo7777" src="Queso2.png" alt="Fondo Cocinero" />

      <div className="admin-buttons">
        <button className="admin-button" onClick={handleVerStock}>
          Ver stocks
        </button>
        <button className="admin-button" onClick={handleAñadirProductos}>
          Añadir un producto
        </button>
        <button className="admin-button" onClick={handleEliminarProducto}>
          Eliminar Producto
        </button>
        <button className="admin-button" onClick={handleVerEstadisticas}>
          Ver Estadisticas
        </button>
      </div>

      <button className="boton-logout" onClick={handleLogout}>
        <RiLogoutCircleRLine size={20} />
        <span style={{ marginLeft: "5px" }}>Cerrar sesión</span>
      </button>
      
      <button className="boton-notificaciones" onClick={toggleNotificaciones}>
        <IoNotificationsOutline size={24} />
        
      </button>
      
      {/* Modal de Notificaciones */}
      {notificacionesVisible && (
        <div className="notificaciones-modal">
          <div className="notificaciones-modal-content">
            <h3>Notificaciones</h3>
            <p>Este es el recuadro de notificaciones.</p>
            <button onClick={toggleNotificaciones}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaAdmin;
