import React from 'react';
import './ModalGuardado.css'; // Estilos CSS para el modal

const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='Advertencia'>Confirmación</h2>
        <p>Se ha guardado correctamente la publicación en tu biblioteca</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;