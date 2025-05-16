import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import "../Styles/PaginaAdmin.css";

  
const AñadirProductos = ({setAuth}) => {
      
    const navigate = useNavigate()
  
    const handleLogout = () => {
        localStorage.clear();
        if (setAuth) setAuth(false);
        navigate("/PaginaAdmin", { replace: true });
    };
    return (
        <div>
            <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
            <img className="Fondo777" src="Queso1.png" alt="Fondo Cocinero" />
            <img className="Fondo7777" src="Queso2.png" alt="Fondo Cocinero" />
  
  
            <button className="boton-logout" onClick={handleLogout}>
                <RiLogoutCircleRLine size={20} />
                <span style={{ marginLeft: "5px" }}>Regresar</span>
            </button>
        </div>
  
  
        )
}
  export default AñadirProductos;