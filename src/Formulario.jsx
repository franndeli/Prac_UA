import React, { useState } from 'react';
import './Formulario.css';

export default function Formulario() {
  // Definimos el estado para controlar qué formulario se muestra y el color del botón
  const [formulario, setFormulario] = useState('usuario');
  const [color, setColor] = useState('blue');

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
      <p>Ajustes</p>
      <div>
        {/* Botones para cambiar entre los formularios */}
        <button className={`custom-button ${formulario === 'usuario' ? 'blue' : ''}`} onClick={mostrarFormularioUsuario}>Usuario</button>
        <button className={`custom-button ${formulario === 'sistema' ? 'blue' : ''}`} onClick={mostrarFormularioSistema}>Sistema</button>
      </div>
      {/* Contenido del formulario */}
      {/* Renderizamos el formulario según el estado "formulario" */}
      {formulario === 'usuario' ? (
        <div>
          <fieldset className="Formulario">
            <legend>Ajuste del sistema</legend>
            <label>
              <p>Nombre: <input type="text" /></p>
            </label>
            <label>
              <p>Contraseña: <input type="password" /></p>
            </label>
            <label>
              <p>Correo electrónico: <input type="email" /></p>
            </label>
            <label>
              <p>Descripción: <textarea cols={20} /></p>
            </label>
            <div>
              <button className="custom-button-red">Borrar cuenta</button>
              <button className={`custom-button ${color}`} onClick={cambiarColor}>Guardar Cambios</button>
            </div>
          </fieldset>
        </div>
      ) : (
        <div>
          <fieldset>
            <legend>Ajuste del sistema</legend>
              <p>
              <form>
                <label>Color:</label>
                <div>
                  <input type="radio" id="claro" name="Color" value="Claro" checked />
                  <label for="claro">Claro</label>
                </div>
                <div>
                  <input type="radio" id="oscuro" name="Color" value="Oscuro" />
                  <label for="oscuro">Oscuro</label>
                </div>
              </form>
              </p>
              <p>
              <label for="Idioma">Idioma</label>
                <select name="Idioma" id="Idioma">
                  <option checked>Español</option>
                  <option>Inglés</option>
                  <option>Chino</option>
                  <option>Francés</option>
                  <option>Italiano</option>
                  <option>Japonés</option>
                  <option>Portugués</option>
                </select>
              </p>
              <p>
              <form>
                <label>Modo daltónico:</label>
                <div>
                  <input type="radio" id="Activado" name="Activado" value="Activado" checked />
                  <label for="Activado">Activado</label>
                </div>
                <div>
                  <input type="radio" id="Desactivado" name="Desactivado" value="Desactivado" />
                  <label for="Desactivado">Desactivado</label>
                </div>
              </form>
              </p>
              <p>
              <label for="Letra">Tamaño de letra</label>
                <select name="Letra" id="Letra">
                  <option checked>12</option>
                  <option>16</option>
                  <option>20</option>
                  <option>24</option>
                  <option>28</option>
                  <option>32</option>
                  <option>36</option>
                </select>
              </p>
            <div>
              <button className={`custom-button ${color}`} onClick={cambiarColor}>Guardar Cambios</button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}