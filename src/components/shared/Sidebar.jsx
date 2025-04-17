import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiHome6Line,
  RiPieChartLine,
  RiNotification3Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import "../Styles/Sidebar.css";

const Sidebar = ({ setAuth }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <ul>
          <li className="active">
            <a href="#">
              <RiHome6Line className="icon" />
              {isHovered && <span className="menu-text">Inicio</span>}
            </a>
          </li>
         
          <li>
            <a href="#">
              <RiNotification3Line className="icon" />
              {isHovered && <span className="menu-text">Notificaciones</span>}
            </a>
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