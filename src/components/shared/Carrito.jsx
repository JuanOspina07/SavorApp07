import React from "react";
import "../Styles/Carrito.css";
const Carrito = ({ cart, addToCart, removeFromCart, deleteFromCart, setShowCart,
  setMostrarPasarela, }) => {
    const total = cart.reduce((sum, item) => sum + item.Precio * item.cantidad, 0);
  
    return (
      <div className="carrito-overlay">
        <div className="carrito-header">
          <h2>Carrito de Compras</h2>
          <button className="cerrar-carrito" onClick={() => setShowCart(false)}>×</button>
        </div>
  
        {cart.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
        ) : (
          <div className="carrito-items">
            {cart.map((item) => (
              <div key={item.idProducto} className="carrito-item">
                <img src={item.Imagen} alt={item.Nombre} className="carrito-img" />
                <div className="carrito-info">
                  <h4>{item.Nombre}</h4>
                  <p>${item.Precio}</p>
                  <div className="cantidad-controles">
                    <button className="eliminar-item" onClick={() => removeFromCart(item.idProducto)}>
                    <img src="menos.png" alt="eliminar del carrito" />
                    </button>
                    <span>{item.cantidad}</span>
                    <button className="eliminar-item" onClick={() => addToCart({ ...item, cantidad: 1 })}>
  <img src="mas.png" alt="sumar al carrito" />
</button>
                    <button className="eliminar-item" onClick={() => deleteFromCart(item.idProducto)}>
                    <img src="eliminar.png" alt="eliminar del carrito" />
</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="carrito-total">
              <h3>Total: ${total.toLocaleString()}</h3>
            </div>
            <div>
            <button className="compra" onClick={() => setMostrarPasarela(true)}>Comprar</button>
            </div>
            
          </div>
        )}
      </div>
    );
  };

export default Carrito;
