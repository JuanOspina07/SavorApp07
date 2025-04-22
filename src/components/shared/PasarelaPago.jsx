import React, { useState } from 'react';
import '../Styles/PasarelaPago.css';
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const PasarelaPago = ({ total, onClose, onConfirm, vaciarCarrito }) => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('');
  const [formularioLlenado, setFormularioLlenado] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    numero: '',
    paypalCorreo: '',
  });

  const seleccionarMetodo = (metodo) => {
    setMetodoSeleccionado(metodo);
    setFormularioLlenado(false);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosPago({ ...datosPago, [name]: value });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    setFormularioLlenado(true);
  };


  const lanzarConfeti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const confirmarCompra = () => {
    setPagoExitoso(true);
    lanzarConfeti();

    setTimeout(() => {
      setPagoExitoso(false);
      if (typeof vaciarCarrito === 'function') {
        vaciarCarrito(); // Vacía el carrito
      }
      onConfirm({ metodo: metodoSeleccionado, datos: datosPago });
      onClose(); // Cierra la ventana
    }, 3000);
  };

  const renderFormulario = () => {
    switch (metodoSeleccionado) {
      case 'Tarjeta de Crédito':
        return (
          <form onSubmit={enviarFormulario} className="formulario-pago">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del titular"
              value={datosPago.nombre}
              onChange={manejarCambio}
              required
            />
            <input
              type="text"
              name="numero"
              placeholder="Número de tarjeta"
              value={datosPago.numero}
              onChange={manejarCambio}
              required
            />
            <button className="btn-formulario">Continuar</button>
          </form>
        );
      case 'PayPal':
        return (
          <form onSubmit={enviarFormulario} className="formulario-pago">
            <input
              type="email"
              name="paypalCorreo"
              placeholder="Correo de PayPal"
              value={datosPago.paypalCorreo}
              onChange={manejarCambio}
              required
            />
            <button className="btn-formulario">Continuar</button>
          </form>
        );
      case 'Pago en Efectivo':
        return (
          <div className="formulario-pago">
            <p>Este pago se realizará en el punto físico.</p>
            <button onClick={() => setFormularioLlenado(true)} className="btn-formulario">Confirmar</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overlay-pago">
      {pagoExitoso ? (
        <div className="mensaje-exito mensaje-flotante">
          <div className="icono-verde">✔</div>
          <p>¡Pago exitoso!</p>
        </div>
      ) : (
        <div className="modal-pago">
          <h2>Pasarela de Pago</h2>
          <p className="total-compra">Total a pagar: <strong>${total.toLocaleString()}</strong></p>
  
          {!metodoSeleccionado ? (
            <>
              <p>Selecciona un método de pago:</p>
              <div className="metodos-pago">
                <button onClick={() => seleccionarMetodo('Tarjeta de Crédito')}>
                  <FaCreditCard size={24} /> Tarjeta de Crédito
                </button>
                <button onClick={() => seleccionarMetodo('PayPal')}>
                  <FaPaypal size={24} /> PayPal
                </button>
                <button onClick={() => seleccionarMetodo('Pago en Efectivo')}>
                  <FaMoneyBillWave size={24} /> Efectivo
                </button>
              </div>
              <button className="btn-cerrar" onClick={onClose}>Cancelar</button>
            </>
          ) : !formularioLlenado ? (
            <>
              <p>Llena los datos para continuar con <strong>{metodoSeleccionado}</strong>:</p>
              {renderFormulario()}
              <button className="btn-cancelar" onClick={() => setMetodoSeleccionado('')}>Cambiar método</button>
            </>
          ) : (
            <>
              <p>¿Confirmas la compra con <strong>{metodoSeleccionado}</strong>?</p>
              <div className="botones-confirmacion">
                <button className="btn-confirmar" onClick={confirmarCompra}>Sí, Confirmar</button>
                <button className="btn-cancelar" onClick={() => setFormularioLlenado(false)}>No, Volver</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PasarelaPago;
