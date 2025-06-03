import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import React, { useState, useEffect } from 'react';

import "../Styles/añadirProductos.css";
import "../Styles/PaginaAdmin.css";

const Alert = ({ message, type, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: '#fff',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        fontWeight: 'bold',
        minWidth: '250px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={onClose}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

const AñadirProductos = ({ setAuth }) => {
  const [categorias2, setCategorias2] = useState([]);
  const [categoriaSeleccionada2, setCategoriaSeleccionada2] = useState(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  // Estados para alertas
  const [alert, setAlert] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias2(data))
      .catch((error) => {
        console.error("Error cargando categorías", error);
        showAlert('Error cargando categorías', 'error');
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    if (setAuth) setAuth(false);
    navigate("/PaginaAdmin", { replace: true });
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !imagen || !categoriaSeleccionada2) {
      showAlert("Por favor completa todos los campos.", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          imagen,
          idCategoria: categoriaSeleccionada2
        })
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("Producto agregado con éxito.", "success");
        // Limpiar campos
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setImagen("");
        setCategoriaSeleccionada2(null);
      } else {
        showAlert(`Error: ${data.mensaje}`, "error");
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
      showAlert("Error al conectar con el servidor.", "error");
    }
  };

  return (
    <div className="container">
      <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
      <img className="Fondo777" src="Queso1.png" alt="Fondo Cocinero" />
      <img className="Fondo7777" src="Queso2.png" alt="Fondo Cocinero" />
      <div className="form-container777">
        <h1 className="form-title">Añadir Productos</h1>
        <div className="divider"></div>

        <form className="formulario777" onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              id="nombreProducto"
              placeholder="Nombre del Producto"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <textarea
              id="descripcion"
              placeholder="Descripción del Producto"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          <div className='form-group'>
            <input
              id="precio"
              placeholder="Precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <select
              className="categoria"
              value={categoriaSeleccionada2 || ""}
              onChange={e => setCategoriaSeleccionada2(e.target.value === "" ? null : Number(e.target.value))}
              required
            >
              <option className="ctg" value="">Seleccione una categoría</option>
              {categorias2.map((categoria2) => (
                <option className='ctg' key={categoria2.IdCategoria} value={categoria2.IdCategoria}>
                  {categoria2.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <input
              id="imagenprod"
              placeholder="URL de la Imagen"
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="boton-agregar">Agregar Producto</button>
        </form>
      </div>

      <button className="boton-logout" onClick={handleLogout}>
        <RiLogoutCircleRLine size={20} />
        <span style={{ marginLeft: "5px" }}>Regresar</span>
      </button>

      {/* Renderizar alerta si existe mensaje */}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default AñadirProductos;
