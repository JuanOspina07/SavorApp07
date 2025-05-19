import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../Styles/PedidosCliente.css";

const estados = ["En cola", "En preparación", "Listo", "Entregado"];

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

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="pedidos-cliente">
      <Sidebar setAuth={setAuth} />
      <h2>Mis pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.idPedido}>
              <strong>Pedido #{pedido.idPedido}</strong>
              <span className="estado">{pedido.nombreEstado}</span>
              <span className="fecha">
                Fecha: {new Date(pedido.FechaPedido).toLocaleString()}
              </span>
              <div className="progress-bar-container">
                {estados.map((estado, idx) => (
                  <div
                    key={estado}
                    className={
                      "progress-bar-segment" +
                      (estados.findIndex(
                        (e) => e.toLowerCase() === pedido.nombreEstado?.toLowerCase()
                      ) >= idx
                        ? " filled"
                        : "")
                    }
                  ></div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PedidosCliente;