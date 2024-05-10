import React from 'react';
import './ConfirmarNuevoUsuario.css'; // Estilos CSS para el modal

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='Advertencia'>Nuevo usuario</h2>
        <p>¡¡Se ha creado correctamente tu usuario!!</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Acceder</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;