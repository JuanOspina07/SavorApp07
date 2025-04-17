// src/App.js
import React, { useState, useEffect } from "react";
import Sidebar from "./components/shared/Sidebar";
import Header from "./components/shared/Header";
import "./components/Styles/App.css";
import Carrito from "./components/shared/carrito";

function App({ setAuth }) {
  const [showMenu, setShowMenu] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mensajeAgregado, setMensajeAgregado] = useState(false);



  useEffect(() => {
    fetch("http://localhost:4000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error cargando categorías", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/productos")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProductos(data))
      .catch((error) => console.error("Error cargando productos", error));
  }, []);

  const filtrarProductos = (idCategoria) => {
    setCategoriaSeleccionada(idCategoria);
    const url = idCategoria
      ? `http://localhost:4000/api/productos?categoria=${idCategoria}`
      : "http://localhost:4000/api/productos";

    fetch(url)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProductos(data))
      .catch((error) => console.error("Error filtrando productos", error));
  };
  const productosFiltrados = productos.filter((producto) =>
    producto.Nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.idProducto === producto.idProducto);
      if (existing) {
        return prevCart.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
      
    });
    setMensajeAgregado(true);
    setTimeout(() => setMensajeAgregado(false), 1200);
  };

  const removeFromCart = (idProducto) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.idProducto === idProducto && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const deleteFromCart = (idProducto) => {
    setCart((prevCart) => prevCart.filter((item) => item.idProducto !== idProducto));
  };

  return (
    <div className="container3">
      <Sidebar showMenu={showMenu} setAuth={setAuth} />
      <div className="header3">
      <Header setShowCart={setShowCart} onSearch={setSearchQuery} />
      </div>

      {showCart && (
        <Carrito
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          setShowCart={setShowCart}
        />
      )}

      <div className="categories-container">
        <button
          className={`button32 ${categoriaSeleccionada === null ? "active" : ""}`}
          onClick={() => filtrarProductos(null)}
        >
          Todos
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria.IdCategoria}
            className={`button32 ${
              categoriaSeleccionada === categoria.IdCategoria ? "active" : ""
            }`}
            onClick={() => filtrarProductos(categoria.IdCategoria)}
          >
            {categoria.Nombre}
          </button>
        ))}
      </div>

      <div className="products-container">
  {productos.length === 0 ? (
    <p className="no-results-message">No se pudieron cargar los productos.</p>
  ) : productosFiltrados.length === 0 ? (
    <p className="no-results-message">No se encontraron productos que coincidan con tu búsqueda.</p>
  ) : (
    productosFiltrados.map((producto) => (
      <div key={producto.idProducto} className="product-card">
        <img
          src={producto.Imagen}
          className="product-image"
          alt={producto.Nombre}
        />
        <h3 className="product-title">{producto.Nombre}</h3>
        <span className="product-price">${producto.Precio}</span>
        <button className="add-to-cart-btn" onClick={() => addToCart(producto)}>
          <img src="añadir.png" alt="Agregar al carrito" />
        </button>
        {mensajeAgregado && (
  <div className="mensaje-agregado">¡Producto añadido al carrito!</div>
)}
        <div className="product-description">
          <p>{producto.Descripcion}</p>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
}

export default App;
