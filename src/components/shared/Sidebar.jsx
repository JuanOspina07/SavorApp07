import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import {
  RiHome6Line,
  RiPercentLine,
  RiPieChartLine,
  RiMailLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";

const Sidebar = ({ showMenu, setAuth }) => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Eliminar autenticación
    setAuth(false); // Actualizar estado de autenticación
    navigate("/"); // Redirigir al login
    
  };

  return (
    <div
      className={`bg-[#1F1D2B] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      <div>
        <ul className="pl-4">
          <li>
            <button
              onClick={handleLogout}
              
              style={{
                marginLeft: "3px",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Cerrar sesión
            </button>
          </li>
          <li className="bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl">
            <a
              href="#"
              className="bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-white"
            >
              <RiHome6Line className="text-2xl" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiPercentLine className="text-2xl" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiPieChartLine className="text-2xl" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiMailLine className="text-2xl" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiNotification3Line className="text-2xl" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiSettings4Line className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4">
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <button
              onClick={handleLogout}
              className="group-hover:bg-[#ec7c6a] p-4 flex justify-center rounded-xl text-[#ec7c6a] group-hover:text-white transition-colors"
            >
              <RiLogoutCircleRLine className="text-2xl" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
