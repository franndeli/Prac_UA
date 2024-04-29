import React, { useState } from 'react';
import './Registro.css';
import logo from './images/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function IniciarSesion() {

    // useState para manejar los inputs
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [email, setEmail] = useState('');
    // const [titulacion_cursada, setTitulacion_cursada] = useState('');
    const [nombre, setNombre] = useState('');
    const [repetir_contraseña, setRepetirContraseña] = useState('');

    // Manejadores para los inputs
    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handleContraseñaChange = (e) => setContraseña(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    // const handleTitulacion_cursadaChange = (e) => setTitulacion_cursada(e.target.value);
    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleRepetirContraseñaChange = (e) => setRepetirContraseña(e.target.value);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='registro'>
            <div className="titulo-web">
                <img src={logo} alt="Logo de la web"></img>
                <h1>TÍTULO DE LA WEB</h1>
            </div>
            <div className='formulario-registro'>
                <form onSubmit={handleSubmit}>
                    <h2>REGISTRARSE</h2>
                    <div className="inputs_registro">
                        <div className="inputs_registro_0">
                            <label htmlFor="nombre">
                                <div className="input-icon-container_registro">
                                    <FontAwesomeIcon icon={fas.faFileSignature} className="input-icon" />
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="nombre" 
                                        value={nombre}
                                        onChange={handleNombreChange}
                                        placeholder="Nombre completo" 
                                    />
                                </div>
                            </label>
                            <label htmlFor="usuario">
                                <div className="input-icon-container_registro">
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
                                <div className="input-icon-container_registro">
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
                        </div>
                        <div className="inputs_registro_1">
                            
                            <label htmlFor="email">
                                <div className="input-icon-container_registro">
                                    <FontAwesomeIcon icon={fas.faAt} className="input-icon" />
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Email" 
                                    />
                                </div>
                            </label>
                            <label htmlFor="titulacion_cursada">
                                <div className="input-icon-container_registro">
                                <FontAwesomeIcon icon={fas.faSchool} className="input-icon" />
                                    <select id="titulacion_cursada" name="titulacion_cursada" >
                                        <option value="" disabled selected hidden>Titulación cursada</option>
                                        <option value="ing_multimedia">Ing. Multimedia</option>
                                    </select>
                                </div>
                            </label>
                            <label htmlFor="repetir_contraseña">
                                <div className="input-icon-container_registro">
                                    <FontAwesomeIcon icon={fas.faUnlock} className="input-icon" />
                                    <input 
                                        type="password" 
                                        id="repetir_contraseña" 
                                        name="repetir_contraseña" 
                                        value={repetir_contraseña}
                                        onChange={handleRepetirContraseñaChange}
                                        placeholder="Repetir contraseña" 
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <button className="boton_aceptar" type="submit">ACEPTAR</button>
                </form>
                <hr className="separador"/>
                <p className="registrate">¿Ya tienes una cuenta? <a href="/iniciarsesion">Inicia sesión</a> </p>
            </div>
        </div>
    );
  }