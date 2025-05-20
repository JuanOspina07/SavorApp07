import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import "../Styles/PaginaAdmin.css";
import "../Styles/VerEstadisticas.css";

const VerEstadisticas = ({setAuth}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        if (setAuth) setAuth(false);
        navigate("/PaginaAdmin", { replace: true });
    };

    return (
        <div className="estadisticas-bg">
            <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
                    <img className="Fondo777" src="Queso1.png" alt="Queso 1" />
                    <img className="Fondo7777" src="Queso2.png" alt="Queso 2" />
                    
            <div className="estadisticas-contenedor">
                <h2 className="estadisticas-titulo">📊 Estadísticas del Negocio</h2>
                <div className="estadisticas-imagenes">
                    
                </div>
                <div className="estadisticas-iframe">
                    <iframe
                        title="Estadísticas Power BI"
                        width="100%"
                        height="600"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMTM1MWExNDUtOWZjNS00NWE4LWJhODQtYTM5Y2IwZWMzNDQwIiwidCI6ImZkNzY2ZWRkLThiZWEtNGM5OS04NjcyLTU2ZDFjYWJjMjcwNiIsImMiOjR9"
                        frameBorder="0"
                        allowFullScreen={true}
                    ></iframe>
                </div>
                 
            </div>
            <button className="boton-logout" onClick={handleLogout}>
                    <RiLogoutCircleRLine size={20} />
                    <span style={{ marginLeft: "5px" }}>Regresar</span>
            </button>
           
        </div>
        
    )
}

export default VerEstadisticas