import React, { useState } from 'react';
import './IniciarSesion.css';
import logo from './images/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function IniciarSesion() {

    const navigate = useNavigate();

    // useState para manejar los inputs
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    // Manejadores para los inputs
    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handleContraseñaChange = (e) => setContraseña(e.target.value);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/iniciarSesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contraseña }),
            });
            
            const data = await response.json(); // Asegurarse de manejar la respuesta JSON

            if (response.ok) {
                console.log('Inicio de sesión exitoso desde el frontend', data);

                // Almacenar datos del usuario en localStorage
                localStorage.setItem('id_usuario', data.user.id);
                localStorage.setItem('usuario', data.user.usuario);

                navigate('/inicio'); // Redirige a la página de inicio
            } else {
                throw new Error(data.error || 'Error al iniciar sesión'); // Manejo de errores del servidor
            }
            
            navigate('/inicio');
        } catch (error) {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };



    return (
        <div className='iniciar-sesion'>
            <div className="titulo-web">
                <img src={logo} alt="Logo de la web"></img>
                <h1 className="iniciar_sesion_h1">TÍTULO DE LA WEB</h1>
            </div>
            <div className='formulario-iniciar-sesion'>
                <form onSubmit={handleSubmit}>
                    <h2 className="iniciar_sesion_h2">INICIAR SESIÓN</h2>
                    <label htmlFor="usuario">
                        <div className="input-icon-container">
                            <FontAwesomeIcon icon={fas.faUser} className="input-icon" />
                            <input className='inputFormularioInicioSesion'
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
                            <input className='inputFormularioInicioSesion'
                                type="password" 
                                id="contraseña" 
                                name="contraseña" 
                                value={contraseña}
                                onChange={handleContraseñaChange}
                                placeholder="Contraseña" 
                            />
                        </div>
                    </label>
                    <span className="recuerdame_contrasena">
                        <div className="recuerdame">
                            <input type="checkbox" id="recuerdame" name="recuerdame" />
                            <label className="label_recuerdame" htmlFor="recuerdame">Recuérdame</label>
                        </div>
                        <a href="/olvido-contraseña" className="olvido-contraseña">¿Has olvidado tu contraseña?</a>
                    </span>
                    <button className="boton_aceptar" type="submit">ACEPTAR</button>
                </form>
                <hr className="separador"/>
                <div className="iniciarsesion_google">
                    <p className="google">Inicia sesión con Google</p>
                    <FontAwesomeIcon icon={fas.faRightToBracket} />
                </div>
                <hr className="separador"/>
                <p className="registrate">¿No tienes cuenta? <a href="/registro">Regístrate</a> </p>
            </div>
        </div>
    );
  }