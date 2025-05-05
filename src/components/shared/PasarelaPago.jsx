import React, { useState, useEffect } from 'react';
import '../Styles/PasarelaPago.css';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaQuestionCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import axios from 'axios';

const PasarelaPago = ({ total, onClose, onConfirm, vaciarCarrito, cart, idUsuario }) => {
  const [mediosPago, setMediosPago] = useState([]);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('');
  const [formularioLlenado, setFormularioLlenado] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    numero: '',
    paypalCorreo: '',
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/medios-pago')
      .then(res => {
        console.log('Métodos de pago recibidos:', res.data);
        setMediosPago(res.data);
      })
      .catch(err => console.error('Error al obtener métodos de pago:', err));
  }, []);

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
    const productosComprados = cart.map(item => ({
      idproducto: item.idProducto,
      nombre: item.Nombre,
      cantidad: item.cantidad,
      precio: item.Precio,
    }));
    console.log(idUsuario);

    axios.post('http://localhost:4000/api/confirmar-compra', { productos: productosComprados })
      .then(response => {
        console.log('Compra confirmada y stock actualizado', response.data);

        // Llamar a la API para enviar la factura
        axios.post('http://localhost:4000/api/enviar-factura', {
          idUsuario, 
          detallesCompra: productosComprados,
          metodoPago: metodoSeleccionado,
          total,
        })
        
          .then(() => {
            console.log('Factura enviada con éxito');
           
          })
          .catch(error => {
            console.error('Error al enviar la factura:', error);
            setPagoExitoso(false);
            alert('Hubo un error al enviar la factura.');
          });
          console.log(idUsuario);
          console.log({
            idUsuario,
            productosComprados,
            metodoPago: metodoSeleccionado,
            total
          });
          axios.post('http://localhost:4000/crear-pedido', {
            idUsuario,
            idEstado: 1, 
            productos: productosComprados,
            metodoPago: metodoSeleccionado,
            total
          })
          .then(response => {
            console.log('Pedido creado correctamente:', response.data);
          lanzarConfeti();
          setPagoExitoso(true);

        // Mantén el mensaje de éxito visible por un tiempo antes de cerrar
        setTimeout(() => {
          if (typeof vaciarCarrito === 'function') {
            vaciarCarrito();
          }
          onConfirm({ metodo: metodoSeleccionado, datos: datosPago });
          onClose();  // Cerrar el modal después de un retraso
        }, 2000);  // 2 segundos de espera
      })
      .catch(error => {
        console.error('Error al confirmar la compra:', error);
        setPagoExitoso(false);
        alert('Hubo un error ya que este producto esta agotado, escoge otro.');
      });
  });
}

  const renderFormulario = () => {
    switch (metodoSeleccionado) {
      case 'Tarjeta Debito/Credito':
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
      case 'Paypal':
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
      case 'Efectivo':
        return (
          <div className="formulario-pago">
            <p>Este pago se realizará en el punto físico.</p>
            <button onClick={() => setFormularioLlenado(true)} className="btn-formulario">Confirmar</button>
          </div>
        );
      default:
        return (
          <div className="formulario-pago">
            <p>No se requiere información adicional para este método.</p>
            <button onClick={() => setFormularioLlenado(true)} className="btn-formulario">Confirmar</button>
          </div>
        );
    }
  };

  const obtenerIcono = (nombre) => {
    switch (nombre) {
      case 'Tarjeta Debito/Credito':
        return <FaCreditCard size={24} />;
      case 'Paypal':
        return <FaPaypal size={24} />;
      case 'Efectivo':
        return <FaMoneyBillWave size={24} />;
      default:
        return <FaQuestionCircle size={24} />;
    }
  };

  return (
    <div className="pago">
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
                {mediosPago.map((medio, index) => (
                  <button key={medio.idMetodoPago || index} onClick={() => seleccionarMetodo(medio.NombreMetodo)}>
                    {obtenerIcono(medio.NombreMetodo)} {medio.NombreMetodo}
                  </button>
                ))}
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
