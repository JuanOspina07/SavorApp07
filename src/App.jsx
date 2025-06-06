import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar";
import Header from "./components/shared/Header";
import "./components/Styles/App.css";
import Carrito from "./components/shared/Carrito";
import PasarelaPago from './components/shared/PasarelaPago';
import PedidosCliente from "./components/shared/PedidosCliente";

function App({ setAuth }) {
  const navigate = useNavigate();

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
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevListos, setPrevListos] = useState(0);

  const estados = ["En cola", "En preparación", "Listo para entregar", "Entregado"];

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

  // Notificaciones y sonido
  useEffect(() => {
    const pedidosListos = pedidos.filter(
      (p) => p.nombreEstado?.toLowerCase() === "listo para entregar"
    );
    if (pedidosListos.length > prevListos) {
      const audio = new Audio("../../public/Noti.mp3");
    
      audio.play();
    }
    setPrevListos(pedidosListos.length);
    // eslint-disable-next-line
  }, [pedidos]);

  const pedidosListos = pedidos.filter(
    (p) => p.nombreEstado?.toLowerCase() === "listo para entregar"
  );

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const idusuario = localStorage.getItem("idUsuario");
    if (!idusuario) {
      setAuth && setAuth(false);
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="container3">
     
      <Sidebar setAuth={setAuth} notificaciones={pedidosListos.length} />
      <div className="header3">
        <Header setShowCart={setShowCart} onSearch={setSearchQuery} onFilter={handlePriceFilter} />
          {/* Menú desplegable de categorías */}
     
      </div>
       <div className="categories-container">
         <img className="Fondo777" src="SAVORAFONDO.JPG" alt="Fondo Cocinero" />
        <select
          className="category-select"
          value={categoriaSeleccionada || ""}
          onChange={e => filtrarProductos(e.target.value === "" ? null : Number(e.target.value))}
        >
          <option value="">Todos</option>
          {categorias.map((categoria) => (
            <option key={categoria.IdCategoria} value={categoria.IdCategoria}>
              {categoria.Nombre}
            </option>
          ))}
        </select>
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

      {mensajeAgregado && (
  <div className="mensaje-agregado">¡Producto añadido al carrito!</div>
)}

      <Routes>
        <Route
          path="/"
          element={
            <>
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
                      <div className="product-description">
                        <p>{producto.Descripcion}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PedidosCliente pedidos={pedidos} loading={loading} error={error} />
          }
        />
        {/* ...otras rutas... */}
      </Routes>

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
