import { useState, useEffect } from "react";
import Sidebar from "./components/shared/Sidebar";
import Header from "./components/shared/Header";
import "./components/Styles/App.css";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Obtener categorías
  useEffect(() => {
    fetch("http://localhost:4000/api/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  // Obtener productos cuando cambia la categoría
  useEffect(() => {
    if (categoriaSeleccionada !== null) {
      fetch(`http://localhost:4000/api/productos?categoria=${categoriaSeleccionada}`)
        .then((response) => response.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error("Error al cargar productos:", error));
    }
  }, [categoriaSeleccionada]);

  return (
    <div className="container3">
      <Sidebar showMenu={showMenu} />
      <div className="header3">
        <Header />
      </div>
      
      {/* Botones de Categorías */}
      <div className="categories-container">
        {categorias.map((categoria) => (
          <button 
            key={categoria.IdCategoria} 
            className={`button32 ${categoriaSeleccionada === categoria.IdCategoria ? "active" : ""}`}
            onClick={() => setCategoriaSeleccionada(categoria.IdCategoria)}
          >
            {categoria.Nombre}
          </button>
        ))}
      </div>

      {/* Lista de Productos */}
      <div className="products-container">
        {productos.map((producto) => (
          <div key={producto.idProducto} className="product-card">
            <img src={producto.Imagen}  className="product-image" />
            <h3>{producto.Nombre}</h3>
            <p>{producto.Descripcion}</p>
            <span>${producto.Precio}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
