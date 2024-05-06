import React, { useState } from 'react';
import './Formulario.css';
import { useNavigate } from 'react-router-dom';
import Datos from './Datos';
import ConfirmationModal from './ConfirmarBorrarCuenta'; 

export default function Formulario() {
  // Definimos el estado para controlar qué formulario se muestra y el color del botón
  const [formulario, setFormulario] = useState('usuario');
  const [color, setColor] = useState('blue');
  const [formData, setFormData] = useState({}); // Estado para almacenar datos del formulario
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigate = useNavigate();

  const handleConfirmarCambios = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ajustesUsuario', {
        method: 'PUT', // Cambiar de POST a PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al guardar los datos del servidor !!');
      }
      setShowModal(true);
    } catch (error) {
      console.log('Error al guardar los datos !!', error);
    }
  };

  const handleModalConfirm = () => {
    // Realizar acción después de confirmar cambios (puedes redirigir aquí si es necesario)
    navigate('/perfil-privado');
  };

  const handleBorrarCuenta = () => {
    setShowConfirmationModal(true); // Mostrar modal de advertencia al intentar borrar cuenta
  };
  
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteAccount = () => {
    // Aquí puedes implementar la lógica para borrar la cuenta
    // Una vez borrada la cuenta, puedes redirigir o realizar otras acciones necesarias
    console.log('Cuenta borrada'); // Ejemplo de acción de borrado de cuenta
    // Redirigir o realizar otras acciones después de borrar la cuenta
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Función para cambiar el formulario a "usuario"
  const mostrarFormularioUsuario = () => {
    setFormulario('usuario');
    setColor('blue');
  };

  // Función para cambiar el formulario a "sistema"
  const mostrarFormularioSistema = () => {
    setFormulario('sistema');
    setColor('blue');
  };

  // Función para cambiar el color a blanco cuando se hace clic en otro botón
  const cambiarColor = () => {
    setColor('');
  };

  return (
    <div>
      <h1>Ajustes</h1>
      <div>
        {/* Botones para cambiar entre los formularios */}
        <button className={`custom-button-Formulario ${formulario === 'usuario' ? 'blue' : ''}`} onClick={mostrarFormularioUsuario}>Usuario</button>
        <button className={`custom-button-Formulario ${formulario === 'sistema' ? 'blue' : ''}`} onClick={mostrarFormularioSistema}>Sistema</button>
      </div>
      {/* Contenido del formulario */}
      {/* Renderizamos el formulario según el estado "formulario" */}
      {formulario === 'usuario' ? (
        <div>
          <fieldset className="Formulario">
            <legend className='legendFormulario'>Ajuste del sistema</legend>

            <div className="form-group-user">
              <div className='label-group'>
                <label htmlFor="Nombre">Nombre:</label>
                <input className="inputFormulario" type="text" id="Nombre" onChange={handleInputChange}/>
              </div>
            </div>

            <div className="form-group-user">
              <div className='label-group'>
                <label htmlFor="Contrasena">Contraseña:</label>
                <input className="inputFormulario" type="password" id="Contrasena" onChange={handleInputChange}/>
              </div>
            </div>
            
            <div className="form-group-user">
              <div className='label-group'>
                <label htmlFor="Email">Correo electrónico:</label>
                <input className="inputFormulario" type="email" id="Email" onChange={handleInputChange}/>
              </div> 
            </div>

            <div className="form-group-user">
              <div className='label-group'>
                <label htmlFor="Descripcion">Descripción:</label>
                <textarea className="inputFormulario" id="Descripcion" cols={20} onChange={handleInputChange}/>
              </div> 
            </div>

            <div>
              <button className="custom-button-Formulario-red" onClick={handleBorrarCuenta}>Borrar cuenta</button>
              <button className={`custom-button-Formulario ${color}`} onClick={handleConfirmarCambios}>Guardar Cambios</button>
            </div>
          </fieldset>
        </div>
      ) : (
        <div>
          <fieldset className="Formulario">
            <legend className='legendFormulario'>Ajuste del sistema</legend>
            <div className="form-group">
            <div className="label-group">
                <label>Color:</label>
                <div>
                  <input className="inputFormulario" type="radio" id="Color" name="Color" value="Claro" onChange={handleInputChange}/>
                  <label htmlFor="claro">Claro</label>
                </div>
                <div>
                  <input type="radio" id="Color" name="Color" value="Oscuro" onChange={handleInputChange}/>
                  <label htmlFor="oscuro">Oscuro</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="label-group">
                  <label>Idioma:</label>
                  <select className="inputFormulario" name="Idioma" id="Idioma" onChange={handleInputChange}>
                    <option>Español</option>
                    <option>Inglés</option>
                    <option>Chino</option>
                    <option>Francés</option>
                    <option>Italiano</option>
                    <option>Japonés</option>
                    <option>Portugués</option>
                  </select>
              </div>
            </div>

            <div className="form-group">
            <div className="label-group">
                <label>Modo daltónico:</label>
                <div>
                  <input type="radio" id="ModoDaltónico" name="ModoDaltonico" value="Activado" onChange={handleInputChange}/>
                  <label htmlFor="Activado">Activado</label>
                </div>
                <div>
                  <input type="radio" id="ModoDaltónico" name="ModoDaltonico" value="Desactivado" onChange={handleInputChange}/>
                  <label htmlFor="Desactivado">Desactivado</label>
                </div>
              </div>
            </div>

            <div className="form-group">
            <div className="label-group">
                <label>Tamaño de letra:</label>
                <select className="inputFormulario" name="Letra" id="Letra" onChange={handleInputChange}>
                  <option>12</option>
                  <option>16</option>
                  <option>20</option>
                  <option>24</option>
                  <option>28</option>
                  <option>32</option>
                  <option>36</option>
                </select>
              </div>
            </div>

            <div>
              <button className={`custom-button-Formulario ${color}`} onClick={handleConfirmarCambios}>Guardar Cambios</button>
            </div>
          </fieldset>
        </div>
      )}

      {/* Renderizar el modal si showModal es true */}
      {showModal && (
        <Datos
          data={formData}
          onClose={handleCloseModal}
          onConfirm={handleModalConfirm}
        />
      )}

      {/* Renderizar el modal de advertencia al intentar borrar cuenta si showConfirmationModal es true */}
      {showConfirmationModal && (
        <ConfirmationModal
          onClose={handleCloseConfirmationModal}
          onConfirm={handleDeleteAccount}
        />
      )}

    </div>
  );
}