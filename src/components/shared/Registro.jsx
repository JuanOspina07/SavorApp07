import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registro.css"


function Registro() {
  const navigate = useNavigate();
 

  const handleRegister = (event) => {
    event.preventDefault(); 
    navigate("/Login"); 
  };

  return (
    <div className="PaginaRegistro">
      <button className="Lr" onClick={() => navigate("/login")}>
        <img src="Flecha.png" alt="" />
      </button>
      <img className="ima12"src="SAV.png" alt="" />
      <img className="ima13"src="OR.png" alt="" />
      <img className="ima14"src="A.png" alt="" />
      <div className="container2">
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Primer Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Segundo Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Primer Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Segundo Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="number" required className="inputfield2" />
            <label className="label2">Edad</label>
          </div>
          <div className="UserBox2">
            <input type="date" required className="inputfield2" />
            <label className="label2">Fecha De Nacimiento</label>
          </div>
          <div className="UserBox2">
            <input type="number" required className="inputfield2" />
            <label className="label2">Identificación</label>
          </div>
          <div className="UserBox2">
            <input type="tel" required className="inputfield2" />
            <label className="label2">Celular</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Pais</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Departamento</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">Ciudad</label>
          </div>
          <div className="UserBox2">
            <input type="text" required className="inputfield2" />
            <label className="label2">UserName</label>
          </div>
          <div className="UserBox2">
            <input type="email" required className="inputfield2" />
            <label className="label2">Correo</label>
          </div>
          <div className="UserBox2">
            <input type="password" required className="inputfield2" />
            <label className="label2">Password</label>
          </div>
          <button className="btresg" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
