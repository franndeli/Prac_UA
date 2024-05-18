import React, { useState } from 'react';
import './Formulario.css';
import { useNavigate } from 'react-router-dom';
import Datos from './Datos';
import ConfirmationModal from './ConfirmarBorrarCuenta';
import iconoSubir from './images/cam.svg';
import camDefault from './images/cam_default.png';

export default function Formulario() {
  const [formulario, setFormulario] = useState('usuario');
  const [imagePreview, setImagePreview] = useState(camDefault);
  const [color, setColor] = useState('blue');
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const userId = localStorage.getItem('id_usuario');
  const navigate = useNavigate();

  const handleConfirmarCambios = async () => {
    try {

      const userId = localStorage.getItem('id_usuario');
      if (!userId) {
      console.error('No se encontró el id_usuario en el localStorage');
      return;
      }

      const response = await fetch(`http://localhost:3001/api/ajustesUsuario/${userId}`, {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const handleBorrarCuenta = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/borrarUsuario/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al borrar la cuenta');
      }
      setShowConfirmationModal(false);
      console.log('Cuenta borrada exitosamente');
      navigate('/iniciarsesion');
    } catch (error) {
      console.error('Error al borrar la cuenta:', error);
    }
  };

  const handleModalConfirm = () => {
    navigate('/perfil-privado');
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
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

  const mostrarFormularioUsuario = () => {
    setFormulario('usuario');
    setColor('blue');
  };

  const mostrarFormularioSistema = () => {
    setFormulario('sistema');
    setColor('blue');
  };

  const handleCambiarFoto = async () => {
    try {
      const userId = localStorage.getItem('id_usuario');
      if (!userId) {
        throw new Error('No se encontró el id_usuario en el localStorage');
      }
  
      const formDataToSend = new FormData();
      const fileInput = document.getElementById('file');
  
      if (fileInput && fileInput.files.length > 0) {
        formDataToSend.append('file', fileInput.files[0]);
      } else {
        throw new Error('Por favor seleccione un archivo');
      }
  
      const response = await fetch(`http://localhost:3001/api/cambiarFoto/${userId}`, {
        method: 'PUT',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Error al cambiar la foto');
      }
  
      // Actualizar la vista o realizar otras acciones necesarias después de cambiar la foto
      console.log('Foto cambiada correctamente');
    } catch (error) {
      console.error('Error al cambiar la foto:', error);
    }
  };
  // Función para cambiar el color a blanco cuando se hace clic en otro botón

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

            <div className="form-group-formulario imagen-subida-formulario">
              <div className="image-upload-container-formulario">
                  <img src={imagePreview} alt="Imagen por defecto" className="image-preview" />
                  <input type="file" id="file" name="file" className="inputfile" onChange={handleImageChange} />
                  <label htmlFor="file" className="image-upload-label-formulario">
                      <div className="upload-icon-container">
                          <img src={iconoSubir} alt="Subir" />
                      </div>
                  </label>
              </div>
              <button className="custom-button-Formulario" onClick={handleCambiarFoto}>Cambiar Foto</button>
            </div>

            <div>
              <button className="custom-button-Formulario-red" onClick={() => setShowConfirmationModal(true)}>Borrar cuenta</button>
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
                  <input className="inputFormulario" type="radio" id="Color" name="Claro" value="Claro" onChange={handleInputChange}/>
                  <label htmlFor="claro">Claro</label>
                </div>
                <div>
                  <input type="radio" id="Color" name="Oscuro" value="Oscuro" onChange={handleInputChange}/>
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
        onConfirm={handleBorrarCuenta }
        />
      )}

    </div>
  );
}