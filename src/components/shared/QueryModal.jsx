import React, { useState } from 'react';
import '../Styles/QueryModal.css';

const QueryModal = ({ isOpen, onClose, onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  // FUNCION PARA APLCIAR FILTROS
  const handleFilter = () => {
    onFilter({ min: parseFloat(minPrice), max: parseFloat(maxPrice) });
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 >Filtrar por precio</h2>
        <input
          className="modal-title"
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="modal-title"
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleFilter}>Aplicar filtros</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
