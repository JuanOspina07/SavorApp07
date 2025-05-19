import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import "../Styles/PaginaAdmin.css";
import "../Styles/VerStock.css";

const VerStock = ({ setAuth }) => {
    const [ingredientes, setIngredientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/api/stock-ingredientes')
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener el stock');
                return res.json();
            })
            .then(data => {
                setIngredientes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <div className="tabla-stock-container">
                    <table className="tabla-stock">
                        <thead>
                            <tr>
                                <th>Ingrediente</th>
                                <th>Cantidad</th>
                                <th>Unidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientes.map((ing, idx) => (
                                <tr key={idx}>
                                    <td>{ing.nombreIngrediente}</td>
                                    <td>{ing.cantidadTotal}</td>
                                    <td>{ing.Unidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button className="boton-logout" onClick={handleLogout}>
                <RiLogoutCircleRLine size={20} />
                <span style={{ marginLeft: "5px" }}>Regresar</span>
            </button>
        </div>
    )
}

export default VerStock