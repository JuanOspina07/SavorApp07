import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import "../Styles/Header.css";
import QueryModal from "./QueryModal";

const Header = ({ setShowCart, onSearch, onFilter }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showQueryModal, setShowQueryModal] = useState(false);
  const handleFilter = ({ min, max }) => {
    onFilter({ min, max });
  };

  useEffect(() => {
    setNombre(localStorage.getItem("nombre") || "");
    setApellido(localStorage.getItem("apellido") || "");
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };



  return (
    <header>
      <div className="header-container">
        <div>
          <h1 className="header-title">
            Bienvenido, {nombre} {apellido}
          </h1>
          <p className="header-date">{new Date().toLocaleDateString()}</p>
        </div>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            type="button"
            className="filter-btn"
            onClick={() => setShowQueryModal(true)}
          >
            <RiSearch2Line size={20} />
          </button>
        </form>

        <QueryModal
          className="modal-overlay"
          isOpen={showQueryModal}
          onClose={() => setShowQueryModal(false)}
          onFilter={handleFilter}
        />

        <button
          className="add-to-cart-btn2"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <img src="carrito.png" alt="Carrito" />
        </button>
      </div>
    </header>
  );
};

export default Header;
