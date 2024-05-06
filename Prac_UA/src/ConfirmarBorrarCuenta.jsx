import React from 'react';
import './ConfirmarBorrarCuenta.css'; // Estilos CSS para el modal

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='Advertencia'>Advertencia</h2>
        <p>¿Estás seguro de que deseas borrar tu cuenta?</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;