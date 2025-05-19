import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "../Styles/PaginaCocinero.css";

export function CocineroPage({ setAuth }) {
  const [detalleActivo, setDetalleActivo] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detallePedido, setDetallePedido] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("En cola");

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

  const estadoNombreANumero = (nombreEstado) => {
    switch (nombreEstado) {
      case "En cola":
        return 1;
      case "En preparación":
        return 2;
      case "Listo para entregar":
        return 3;
      case "Entregado":
        return 4;
      default:
        return 1; // Por defecto
    }
  };

  const actualizarEstadoPedido = () => {
    if (!pedidoSeleccionado) return;
    const estadoActual = estadoNombreANumero(pedidoSeleccionado.nombreEstado);
    const nuevoEstado = Math.min(estadoActual + 1, 4);
    fetch(`http://localhost:4000/api/pedidos/${pedidoSeleccionado.idPedido}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idEstado: nuevoEstado }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPedidos((prev) =>
          prev.map((p) =>
            p.idPedido === pedidoSeleccionado.idPedido
              ? { ...p, nombreEstado: data.nombreEstado }
              : p
          )
        );
        setPedidoSeleccionado((prev) =>
          prev
            ? { ...prev, nombreEstado: data.nombreEstado }
            : prev
        );
      })
      .catch((err) => {
        console.error("Error al actualizar estado:", err);
      });
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

          {/* Filtro por estado */}
          <div className="filtro-estado-botones">
  {["En cola", "En preparación", "Listo para entregar", "Entregado"].map((estado) => (
    <button
      key={estado}
      className={`filtro-btn${filtroEstado === estado ? " activo" : ""}`}
      onClick={() => setFiltroEstado(estado)}
      type="button"
    >
      {estado}
    </button>
  ))}
</div>

          {/* Solo mostrar pedidos que coinciden con el filtro seleccionado */}
          {pedidos
            .filter((pedido) => pedido.nombreEstado === filtroEstado)
            .map((pedido) => (
              <div key={pedido.idPedido} className="card-pedido">
                <span>
                  #{pedido.idPedido} {pedido.nombreUsuario} ({pedido.nombreEstado})
                  <br />
                  <small>
                    {pedido.FechaPedido
                      ? new Date(pedido.FechaPedido).toLocaleString()
                      : ""}
                  </small>
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
       
          {pedidoSeleccionado && estadoNombreANumero(pedidoSeleccionado.nombreEstado) < 4 && (
  <button onClick={actualizarEstadoPedido}>
    Avanzar al siguiente estado
  </button>
)}
          <button className="close-btn" onClick={cerrarDetalle}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default CocineroPage;
