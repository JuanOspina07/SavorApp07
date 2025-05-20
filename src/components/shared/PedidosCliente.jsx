import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../Styles/PedidosCliente.css";

const estados = ["En cola", "En preparación", "Listo para entregar", "Entregado"];

function getProgressWidth(nombreEstado) {
  const idx = estados.findIndex(
    (e) => e.toLowerCase() === nombreEstado?.toLowerCase()
  );
  if (idx === -1) return "10%";
  return `${((idx + 1) / estados.length) * 100}%`;
}

const PedidosCliente = ({ setAuth }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevListos, setPrevListos] = useState(0);

  const idusuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if (!idusuario) {
      setError("No hay usuario autenticado.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:4000/pedidos?usuario=${idusuario}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener pedidos");
        return res.json();
      })
      .then((data) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [idusuario]);

  useEffect(() => {
    const pedidosListos = pedidos.filter(
      (p) => p.nombreEstado?.toLowerCase() === "listo para entregar"
    );
    setPrevListos(pedidosListos.length);
    // eslint-disable-next-line
  }, [pedidos]);

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const pedidosListos = pedidos.filter(
    (p) => p.nombreEstado?.toLowerCase() === "listo para entregar"
  );

  return (
    <div className="pedidos-cliente">
      <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
      <Sidebar setAuth={setAuth} notificaciones={pedidosListos.length} />
      <h2>Mis pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        <ul className="pedidos-lista">
          {pedidos.map((pedido) => {
            const idxEstado = estados.findIndex(
              (e) => e.toLowerCase() === pedido.nombreEstado?.toLowerCase()
            );
            return (
              <li key={pedido.idPedido}>
                <strong>Pedido #{pedido.idPedido}</strong>
                <span className="estado">{pedido.nombreEstado}</span>
                <span className="fecha">
                  Fecha: {new Date(pedido.FechaPedido).toLocaleString()}
                </span>
                <div className="progress-bar-container">
                  {estados.map((estado, i) => {
                    let className = "progress-bar-segment";
                    if (i < idxEstado) className += ` filled estado-${i + 1}`;
                    else if (i === idxEstado) className += ` filled estado-${i + 1}`;
                    if (i === idxEstado + 1) className += ` siguiente estado-${i + 1}`;
                    return <div key={estado} className={className}></div>;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PedidosCliente;