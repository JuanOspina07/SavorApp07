import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EliminarProducto = ({ setAuth }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // <-- para el modal confirm
  const navigate = useNavigate();

  // Cargar productos
  const cargarProductos = () => {
    setLoading(true);
    fetch("http://localhost:4000/api/productos")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/PaginaAdmin", { replace: true });
  };

  // Función para confirmar eliminar
  const confirmarEliminar = (id) => {
    setConfirmDeleteId(id);
  };

  const cancelarEliminar = () => {
    setConfirmDeleteId(null);
  };

  const eliminarProducto = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/productos/${confirmDeleteId}`);
      setProductos(productos.filter(producto => producto.idProducto !== confirmDeleteId));
      toast.success("Producto eliminado correctamente", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.error("Error al eliminar el producto", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
      });
    }
    setConfirmDeleteId(null);
  };

  const btnStyle = {
    backgroundColor: '#e63946',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const btnHoverStyle = {
    backgroundColor: '#d62828',
  };

  return (
    <div>
      {/* Fondos */}
      <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
      <img className="Fondo777" src="Queso1.png" alt="Fondo Cocinero" />
      <img className="Fondo7777" src="Queso2.png" alt="Fondo Cocinero" />

      <div style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        marginTop: '50px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(34, 34, 34, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        height: '85vh',
        overflowY: 'auto',
      }}>
        <h2 style={{ textAlign: 'center', color: '#d4af37', fontSize: '24px' }}>Eliminar Productos</h2>

        {loading && <p style={{ textAlign: 'center' }}>Cargando productos...</p>}
        {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}

        {!loading && !error && (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '40px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#d4af37', color: '#333' }}>
                <th style={{ padding: '12px 15px' }}>Imagen</th>
                <th style={{ padding: '12px 15px' }}>Nombre</th>
                <th style={{ padding: '12px 15px' }}>Precio</th>
                <th style={{ padding: '12px 15px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.idProducto} style={{ borderBottom: '1px solid #d4af37', color: '#fff', textAlign: 'center' }}>
                  <td style={{ padding: '10px' }}>
                    <img
                      src={producto.Imagen}
                      alt={producto.Nombre}
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                  </td>
                  <td style={{ padding: '10px' }}>{producto.Nombre}</td>
                  <td style={{ padding: '10px' }}>${producto.Precio.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => confirmarEliminar(producto.idProducto)}
                      style={hoveredId === producto.idProducto ? { ...btnStyle, ...btnHoverStyle } : btnStyle}
                      onMouseEnter={() => setHoveredId(producto.idProducto)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        className="boton-logout"
        onClick={handleLogout}
        style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <RiLogoutCircleRLine size={20} />
        <span>Regresar</span>
      </button>

      {/* Modal confirmación */}
      {confirmDeleteId !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
            width: '320px', textAlign: 'center',
          }}>
            <p style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 'bold' }}>
              ¿Estás seguro de que deseas eliminar este producto?
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                style={{ ...btnStyle, backgroundColor: '#4CAF50' }}
                onClick={eliminarProducto}
              >
                Sí, eliminar
              </button>
              <button
                style={{ ...btnStyle, backgroundColor: '#777' }}
                onClick={cancelarEliminar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EliminarProducto;
