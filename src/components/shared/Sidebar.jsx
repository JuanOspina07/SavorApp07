import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RiHome6Line,
  RiNotification3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import "../Styles/Sidebar.css";

const Sidebar = ({ setAuth, notificaciones }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [activeButton, setActiveButton] = useState("menu");

  // Sincroniza el botón activo con la ruta actual
  useEffect(() => {
    if (location.pathname === "/menu") {
      setActiveButton("menu");
    } else if (location.pathname === "/Pedidos") {
      setActiveButton("pedidos");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false); // Si usas estado de autenticación
    navigate("/login", { replace: true }); // Redirige siempre al login
  };
  const handlePedido = () => {
    navigate("/Pedidos", { replace: true });
  };

  return (
    <div
      className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <ul>
          <li className={activeButton === "menu" ? "active" : ""}>
            <button
              className="sidebar-link"
              onClick={() => navigate("/menu")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RiHome6Line className="icon" />
              {isHovered && <span className="menu-text">Inicio</span>}
            </button>
          </li>

          <li className={activeButton === "pedidos" ? "active" : ""}>
            <button
              className="sidebar-link"
              onClick={handlePedido}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <RiNotification3Line className="icon" />
              {notificaciones > 0 && (
                <span className="notificacion-badge">{notificaciones}</span>
              )}
              {isHovered && <span className="menu-text">Notificaciones</span>}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <button onClick={handleLogout} className="logout-button">
              <RiLogoutCircleRLine className="icon" />
              {isHovered && <span className="menu-text">Cerrar sesión</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;