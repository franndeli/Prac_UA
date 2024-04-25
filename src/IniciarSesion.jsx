import React, { useState } from 'react';
import './IniciarSesion.css';
import logo from './images/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function IniciarSesion() {

    // useState para manejar los inputs
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    // Manejadores para los inputs
    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handleContraseñaChange = (e) => setContraseña(e.target.value);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías el envío del formulario, tal vez enviando una solicitud HTTP
    };

    return (
        <div className='iniciar-sesion'>
            <div className="titulo-web">
                <img src={logo} alt="Logo de la web"></img>
                <h1>TÍTULO DE LA WEB</h1>
            </div>
            <div className='formulario-iniciar-sesion'>
                <form onSubmit={handleSubmit}>
                    <h2>INICIAR SESIÓN</h2>
                    <label htmlFor="usuario">
                        <div className="input-icon-container">
                            <FontAwesomeIcon icon={fas.faUser} className="input-icon" />
                            <input 
                                type="text" 
                                id="usuario" 
                                name="usuario" 
                                value={usuario}
                                onChange={handleUsuarioChange}
                                placeholder="Usuario" 
                            />
                        </div>
                    </label>
                    <label htmlFor="contraseña">
                        <div className="input-icon-container">
                            <FontAwesomeIcon icon={fas.faLock} className="input-icon" />
                            <input 
                                type="password" 
                                id="contraseña" 
                                name="contraseña" 
                                value={contraseña}
                                onChange={handleContraseñaChange}
                                placeholder="Contraseña" 
                            />
                        </div>
                    </label>
                    <div className="recuerdame">
                        <input type="checkbox" id="recuerdame" name="recuerdame" />
                        <label htmlFor="recuerdame">Recuérdame</label>
                    </div>
                    <a href="/olvido-contraseña" className="olvido-contraseña">¿Has olvidado tu contraseña?</a>
                    <button type="submit">ACEPTAR</button>
                </form>
            </div>
        </div>
    );
  }