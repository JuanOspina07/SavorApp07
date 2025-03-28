import React, { useState, useEffect } from "react"; // Agrega useEffect aquí
import { useNavigate } from "react-router-dom";
import "../Styles/Registro.css";



function Registro() {
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const [selectedPais, setSelectedPais] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(""); // Agregar estado para departamento
  const [ciudades, setCiudades] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const [celular, setCelular] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");




  //Cargar país
  useEffect(() => {
    fetch("http://localhost:4000/api/paises")
      .then((response) => response.json())
      .then((data) => {
        console.log("Países recibidos:", data);
        setPaises(data);
      })
      .catch((error) => console.error("Error al obtener los países:", error));
  }, []);
  
//Cargar departamentos
  useEffect(() => {
    if (selectedPais) {
      fetch(`http://localhost:4000/api/departamentos/${selectedPais}`)
        .then((response) => response.json())
        .then((data) => setDepartamentos(data))
        .catch((error) =>
          console.error("Error al obtener los departamentos:", error)
        );
    } else {
      setDepartamentos([]);
      setCiudades([]); 
    }
  }, [selectedPais]);

  //  Cargar ciudades
  useEffect(() => {
    if (selectedDepartamento) {
      fetch(`http://localhost:4000/api/ciudades/${selectedDepartamento}`)
        .then((response) => response.json())
        .then((data) => setCiudades(data))
        .catch((error) =>
          console.error("Error al obtener las ciudades:", error)
        );
    } else {
      setCiudades([]); 
    }
  }, [selectedDepartamento]);

  //Cargar tipo documento
  useEffect(() => {
    fetch("http://localhost:4000/api/tipos-documento")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tipos de documento recibidos:", data);
        setTiposDocumento(data);
      })
      .catch((error) => console.error("Error al obtener los tipos de documento:", error));
  }, []);
  
  

  const handleRegister = async (event) => {
    event.preventDefault();
    
    if (isNaN(edad) || edad <= 0) {
      alert("Por favor, ingrese una edad válida.");
      return;
    }
  
    const usuarioData = {
      numeroDocumento,
      idTipoDocumento: Number(selectedTipoDocumento),
      nombreUsuario,
      correo,
      contraseña,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad: Number(edad),
      idCiudad: Number(selectedCiudad),
      celular,
      fechaNacimiento,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert(`Error en el registro: ${error.message}`);
    }
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
            <input type="text" value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} required className="inputfield2" />
            <label className="label2">Primer Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} className="inputfield2" />
            <label className="label2">Segundo Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} required className="inputfield2" />
            <label className="label2">Primer Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} required className="inputfield2" />
            <label className="label2">Segundo Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="number" value={edad} onChange={(e) => { const valor = e.target.value.replace(/\D/g, ""); // Elimina cualquier caracter no numérico
  setEdad(valor);}} onKeyDown={(e) => {
    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
  }} required className="inputfield2" />
            <label className="label2">Edad</label>
          </div>
          <div className="UserBox2">
            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className="inputfield2" />
            <label className="label2"></label>
          </div>
          <div className="UserBox2">
              <select
                required
                className="inputfield2"
                value={selectedTipoDocumento}
                onChange={(e) => setSelectedTipoDocumento(e.target.value)}
              >
                <option value="">Seleccione un tipo de documento</option>
                {tiposDocumento.map((tipo) => (
                  <option key={tipo.idTipoDocumento} value={tipo.idTipoDocumento}>
                    {tipo.Nombre}
                  </option>
                ))}
              </select>
              <label className="label2"></label>
            </div>
          <div className="UserBox2">
            <input type="number" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} required className="inputfield2" />
            <label className="label2">Identificación</label>
          </div>
          <div className="UserBox2">
            <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)}  required className="inputfield2" />
            <label className="label2">Celular</label>
          </div>
          {/* 📌 Select para elegir país */}
          <div className="UserBox2">
              <select
                required
                className="inputfield2"
                value={selectedPais}
                onChange={(e) => setSelectedPais(e.target.value)} // Guardar el id del país
              >
                <option value="">Seleccione un país</option>
                {paises.map((pais) => (
                  <option key={pais.idPais} value={pais.idPais}>
                    {pais.Nombre} {/* Muestra el nombre pero envía el ID */}
                  </option>
                ))}
              </select>
              <label className="label2"></label>
          </div>

         {/* elegir departamento */}
          <div className="UserBox2">
            <select
              required
              className="inputfield2"
              value={selectedDepartamento} // Vincular el estado al select
              onChange={(e) => setSelectedDepartamento(e.target.value)} // Actualizar estado al cambiar
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((depto) => (
                <option key={depto.idDepartamento} value={depto.idDepartamento}>
                  {depto.Nombre}
                </option>
              ))}
            </select>
            <label className="label2"></label>
          </div>

          {/* elegir ciudad */}
          <div className="UserBox2">
            <select
              required
              className="inputfield2"
              value={selectedCiudad}
              onChange={(e) => setSelectedCiudad(e.target.value)}
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.Nombre}
                </option>
              ))}
            </select>
            <label className="label2"></label>
          </div>
          <div className="UserBox2">
            <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required className="inputfield2" />
            <label className="label2">UserName</label>
          </div>
          <div className="UserBox2">
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required className="inputfield2" />
            <label className="label2">Correo</label>
          </div>
          <div className="UserBox2">
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className="inputfield2" />
            <label className="label2">Password</label>
          </div>
          <button className="btresg" type="submit">Register</button>
        </form>
      </div>
    </div>
    
  );
}

export default Registro;
