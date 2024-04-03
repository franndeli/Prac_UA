import React, { useState } from 'react';

export default function Formulario() {
  // Definimos el estado para controlar qué formulario se muestra
  const [formulario, setFormulario] = useState('usuario');

  // Función para cambiar el formulario a "usuario"
  const mostrarFormularioUsuario = () => {
    setFormulario('usuario');
  };

  // Función para cambiar el formulario a "sistema"
  const mostrarFormularioSistema = () => {
    setFormulario('sistema');
  };

  // Renderizamos el formulario según el estado "formulario"
  let contenidoFormulario;
  if (formulario === 'usuario') {
    contenidoFormulario = (
      <div>
        <fieldset>
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
            <button>Guardar Cambios</button>
          </div>
        </fieldset>
      </div>
    );
  } else if (formulario === 'sistema') {
    contenidoFormulario = (
      <div>
        <fieldset>
          <legend>Ajuste del sistema</legend>
          <label>
            <p>
              Color
              <form>
                <input type="radio" name="Color" value="Claro" checked /> Claro
                <input type="radio" name="Color" value="Oscuro" /> Oscuro
              </form>
            </p>
          </label>
          <label>
            <p>
              Idioma
              <select multiple name="Idioma" id="Idioma">
                <option checked>Español</option>
                <option>Inglés</option>
                <option>Chino</option>
                <option>Francés</option>
                <option>Italiano</option>
                <option>Japonés</option>
                <option>Portugués</option>
              </select>
            </p>
          </label>
          <label>
            <p>
              Modo daltónico
              <form>
                <input type="radio" name="Dalt" value="Activado" checked /> Activado
                <input type="radio" name="Dalt" value="Desactivado" /> Desactivado
              </form>
            </p>
          </label>
          <label>
          <p>
            Tamaño de letra
              <select multiple name="Letra" id="Letra">
                <option checked>12</option>
                <option>16</option>
                <option>20</option>
                <option>24</option>
                <option>28</option>
                <option>32</option>
                <option>36</option>
              </select>
            </p>
          </label>
          <div>
            <button>Guardar Cambios</button>
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div>
      <p>Ajustes</p>
      <div>
        {/* Botones para cambiar entre los formularios */}
        <button onClick={mostrarFormularioUsuario}>Usuario</button>
        <button onClick={mostrarFormularioSistema}>Sistema</button>
      </div>
      {/* Contenido del formulario */}
      {contenidoFormulario}
    </div>
  );
}