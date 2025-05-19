import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoNotificationsOutline } from "react-icons/io5";
import "../Styles/PaginaAdmin.css";

export function PaginaAdmin({ setAuth }) {

  const navigate = useNavigate();
  const [notificacionesVisible, setNotificacionesVisible] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const [errorNotif, setErrorNotif] = useState(null);

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

  const cargarNotificaciones = () => {
    setLoadingNotif(true);
    setErrorNotif(null);
    fetch("http://localhost:4000/api/notificaciones-stock")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener notificaciones");
        return res.json();
      })
      .then(data => {
        setNotificaciones(data);
        setLoadingNotif(false);
      })
      .catch(err => {
        setErrorNotif(err.message);
        setLoadingNotif(false);
      });
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []); // Solo al montar

  useEffect(() => {
    if (notificacionesVisible) {
      cargarNotificaciones();
    }
  }, [notificacionesVisible]);

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
        {notificaciones.length > 0 && (
          <span className="notificaciones-badge">{notificaciones.length}</span>
        )}
      </button>
      
      {/* Modal de Notificaciones */}
      {notificacionesVisible && (
        <div className="notificaciones-modal">
          <div className="notificaciones-modal-content">
            <h3>Notificaciones de Stock Bajo</h3>
            {loadingNotif && <p>Cargando...</p>}
            {errorNotif && <p style={{ color: "red" }}>{errorNotif}</p>}
            {!loadingNotif && !errorNotif && notificaciones.length === 0 && (
              <p>No hay ingredientes con stock bajo.</p>
            )}
            {!loadingNotif && !errorNotif && notificaciones.length > 0 && (
              <ul>
                {notificaciones.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.nombreIngrediente}</strong>: {item.cantidadTotal} {item.Unidad}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={toggleNotificaciones}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaAdmin;
