import React, { useEffect, useState } from "react";
import { RiSearch2Line, RiMoneyDollarCircleLine } from "react-icons/ri";
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
        <div className="header-row">
          <h1 className="header-title">
            Bienvenido, {nombre} {apellido}
          </h1>
          <span className="header-date">{new Date().toLocaleDateString()}</span>
        </div>
        
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <span className="search-icon">
            <RiSearch2Line size={20} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <div className="header-actions">
          <button
            type="button"
            className="filter-btn"
            onClick={() => setShowQueryModal(true)}
          >
            <RiMoneyDollarCircleLine size={22} />
          </button>
          <button
            className="add-to-cart-btn2"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <img src="carrito.png" alt="Carrito" />
          </button>
        </div>

        <QueryModal
          className="modal-overlay"
          isOpen={showQueryModal}
          onClose={() => setShowQueryModal(false)}
          onFilter={handleFilter}
        />
      </div>
    </header>
  );
};

export default Header;
