import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import "../Styles/Header.css";

const Header = ({ setShowCart, onSearch }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setNombre(localStorage.getItem("nombre") || "");
    setApellido(localStorage.getItem("apellido") || "");
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Notifica al componente padre
  };

  return (
    <header>
      <div className="header-container">
        <div>
          <h1 className="header-title">Bienvenido, {nombre} {apellido}</h1>
          <p className="header-date">{new Date().toLocaleDateString()}</p>
        </div>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <RiSearch2Line className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <button className="add-to-cart-btn2" onClick={() => setShowCart((prev) => !prev)}>
          <img src="carrito.png" alt="Carrito" />
        </button>
      </div>
    </header>
  );
};

export default Header;
