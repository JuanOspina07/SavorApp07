import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import "../Styles/Header.css";

const Header = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre");
    const apellidoGuardado = localStorage.getItem("apellido");

    if (nombreGuardado) setNombre(nombreGuardado);
    if (apellidoGuardado) setApellido(apellidoGuardado);
  }, []);

  return (
    <header>
      <div className="header-container">
        <div>
          <h1 className="header-title">
            Bienvenido, {nombre || "Usuario"} {apellido || ""}
          </h1>
          <p className="header-date">{new Date().toLocaleDateString()}</p>
        </div>
        <form className="search-form">
          <RiSearch2Line className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
