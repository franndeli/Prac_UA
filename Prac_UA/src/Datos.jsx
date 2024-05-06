import React from 'react';
import './Datos.css'; // Estilos CSS para el modal

const Datos = ({ data, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='ConfirmarCambios'>Confirmar Cambios</h2>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong> {value}
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Datos;