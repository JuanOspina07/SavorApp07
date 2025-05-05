import React, { useState, useEffect } from "react";
import Sidebar from "./components/shared/Sidebar";
import Header from "./components/shared/Header";
import "./components/Styles/App.css";
import Carrito from "./components/shared/carrito";
import PasarelaPago from './components/shared/PasarelaPago';

function App({ setAuth }) {
  const [showMenu, setShowMenu] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [mensajeAgregado, setMensajeAgregado] = useState(false);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem("idUsuario"));
  const [mensajeError, setMensajeError] = useState(null);


  const vaciarCarrito = () => {
    setCart([]);
  };

  const handlePriceFilter = ({ min, max }) => {
    setPriceFilter({ min, max });
  };

  const [mostrarPasarela, setMostrarPasarela] = useState(false);

  const handleConfirmarCompra = (metodoPago) => {
    setMostrarPasarela(false);
    setShowCart(false);
    vaciarCarrito();
  };

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

  const productosFiltrados = productos.filter((producto) => {
    const matchSearch = producto.Nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = (() => {
      const { min, max } = priceFilter;
      const precio = Number(producto.Precio);
      if (min != null && max != null) return precio >= min && precio <= max;
      if (min != null) return precio >= min;
      if (max != null) return precio <= max;
      return true;
    })();
    return matchSearch && matchPrice;
  });
  const addToCart = async (producto) => {
    const cantidadSolicitada = producto.cantidad || 1; // Si la cantidad no está definida, usa 1 por defecto
  
    // Verifica si el producto ya está en el carrito
    const productoExistente = cart.find((item) => item.idProducto === producto.idProducto);
    const cantidadTotal = productoExistente ? productoExistente.cantidad + cantidadSolicitada : cantidadSolicitada;
  
    try {
      // Solicita la verificación del stock, pasando la cantidad total que el usuario desea
      const res = await fetch(`http://localhost:4000/verificar-stock/${producto.idProducto}?cantidad=${cantidadTotal}`);
      const data = await res.json();
  
      if (!data.success) {
        setMensajeError("No hay suficientes ingredientes para este producto.");
        setTimeout(() => setMensajeError(null), 3000);
        return;
      }
  
      // Si hay stock disponible, agrega el producto al carrito
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.idProducto === producto.idProducto);
        if (existing) {
          return prevCart.map((item) =>
            item.idProducto === producto.idProducto
              ? { ...item, cantidad: item.cantidad + cantidadSolicitada }
              : item
          );
        } else {
          return [...prevCart, { ...producto, cantidad: cantidadSolicitada }];
        }
      });
  
      setMensajeAgregado(true);
      setTimeout(() => setMensajeAgregado(false), 1200);
    } catch (error) {
      console.error("Error al verificar stock:", error);
      alert("Hubo un error al verificar el stock.");
    }
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

  // Actualizamos el total cuando el carrito cambia
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.Precio * item.cantidad), 0);
    setTotalCarrito(total);
  }, [cart]);

  return (
    <div className="container3">
      <Sidebar showMenu={showMenu} setAuth={setAuth} />
      <div className="header3">
        <Header setShowCart={setShowCart} onSearch={setSearchQuery} onFilter={handlePriceFilter} />
      </div>

      {showCart && (
        <Carrito
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          setShowCart={setShowCart}
          setMostrarPasarela={setMostrarPasarela}
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
    className={`button32 ${categoriaSeleccionada === categoria.IdCategoria ? "active" : ""}`}
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

      {mostrarPasarela && (
        <PasarelaPago
          total={totalCarrito}
          cart={cart} 
          onClose={() => setMostrarPasarela(false)}
          onConfirm={handleConfirmarCompra}
          vaciarCarrito={vaciarCarrito}
          idUsuario={usuarioId}
        />
      )}
      {mensajeError && (
  <div className="mensaje-error-toast">
    {mensajeError}
  </div>
)}
    </div>
  );
}

export default App;
