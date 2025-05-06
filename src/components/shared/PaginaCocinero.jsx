import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "../Styles/PaginaCocinero.css";

export function CocineroPage({ setAuth }) {
  const [detalleActivo, setDetalleActivo] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detallePedido, setDetallePedido] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    fetch("http://localhost:4000/pedidos")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data.reverse()); // Invertimos antes de guardar en el estado
      })
      .catch((err) => {
        console.error("Error al cargar pedidos:", err);
      });
  }, []);
  

  const mostrarDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    fetch(`http://localhost:4000/pedidos/${pedido.idPedido}/detalle`)
      .then((res) => res.json())
      .then((data) => {
        setDetallePedido(data);
        setDetalleActivo(true);
      })
      .catch((err) => {
        console.error("Error al obtener detalles:", err);
      });
  };

  const cerrarDetalle = () => {
    setDetalleActivo(false);
    setPedidoSeleccionado(null);
    setDetallePedido([]);
  };

  return (
    <div className="PaginaCocinero">
      <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
      <img className="Fondo777" src="Queso1.png" alt="Fondo Cocinero" />
      <img className="Fondo7777" src="Queso2.png" alt="Fondo Cocinero" />

      {/* Botón de Cerrar Sesión */}
      <button className="boton-logout" onClick={handleLogout}>
        <RiLogoutCircleRLine size={20} />
        <span style={{ marginLeft: "5px" }}>Cerrar sesión</span>
      </button>

      <div className="contenedor-central">
        <div className="contenedor pedidos">
          <h2 className="tit">PEDIDOS</h2>
          {pedidos.map((pedido) => (
            <div key={pedido.idPedido} className="card-pedido">
              <span>
                {pedido.idPedido} - {pedido.nombreUsuario} ({pedido.nombreEstado})
              </span>
              <button onClick={() => mostrarDetalle(pedido)}>Ver Detalle</button>
            </div>
          ))}
        </div>

        <div className={`contenedor detalles ${detalleActivo ? "" : "oculto"}`}>
          <h2 className="tit">
            DETALLES DEL PEDIDO #{pedidoSeleccionado?.idPedido}
          </h2>
          {detallePedido.length > 0 ? (
            <ul>
              {detallePedido.map((detalle) => (
                <li key={detalle.idPedidoDetalle}>
                  {detalle.nombre} - {detalle.Cantidad} unidad(es) - Pago:{" "}
                  {detalle.nombreMetodo}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay detalles disponibles.</p>
          )}
          <button onClick={cerrarDetalle}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default CocineroPage;
