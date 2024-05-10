import React, { useState } from 'react';
import './Registro.css';
import logo from './images/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfirmarNuevoUsuario from './ConfirmarNuevoUsuario'; 

export default function Registro() {

    const handleModalConfirm = () => {
        // Realizar acción después de confirmar cambios (puedes redirigir aquí si es necesario)
        navigate('/iniciarsesion');
        setShowModal(false); // Ocultar el modal después de confirmar
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };

    const navigate = useNavigate();

    // useState para manejar los inputs
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [repetir_contraseña, setRepetirContraseña] = useState('');
    const [titulacion, setTitulacion] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handleContraseñaChange = (e) => setContraseña(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleRepetirContraseñaChange = (e) => setRepetirContraseña(e.target.value);
    const handleTitulacionChange = (e) => setTitulacion(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();




        // Verificar las restricciones de longitud y contenido de usuario y contraseña
        const usuarioValido = usuario.length >= 6 && usuario.length <= 20;
    const contraseñaValida = contraseña.length >= 6 && contraseña.length <= 20 && /\d/.test(contraseña);
    const contraseñasCoinciden = contraseña === repetir_contraseña;

    if (!usuarioValido) {
        alert('El usuario debe tener entre 6 y 20 caracteres.');
        return;
    } else if (!contraseñaValida) {
        alert('La contraseña debe tener entre 6 y 20 caracteres y contener al menos un número.');
        return;
    } else if (!contraseñasCoinciden) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Si todas las validaciones son exitosas, envía los datos al servidor
    const formData = {
        nombre,
        usuario,
        contraseña,
        email,
        titulacion,
        repetir_contraseña
    };

    try {
        const response = await fetch('http://localhost:3001/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(data); // Imprimir la respuesta del servidor en caso de error
            throw new Error(data.error || 'Error al registrar el usuario');
        }

        {/* Renderizar el modal si showModal es true */}
        setShowModal(true);
        // Aquí puedes redirigir al usuario a la página de inicio de sesión o hacer cualquier otra acción
    } catch (error) {
        alert(error.message);
    }
};

    return (
        <div className='registro'>
            <div className="titulo-web">
                <img src={logo} alt="Logo de la web"></img>
                <h1 className="registro_h1">TÍTULO DE LA WEB</h1>
            </div>
            <div className='formulario-registro'>
                <form onSubmit={handleSubmit}>
                    <h2 className="registro_h2">REGISTRARSE</h2>
                    <div className="inputs_registro">
                        <div className="inputs_registro_0">
                            <label htmlFor="nombre">
                                <div className="input-icon-container_registro">
                                    <FontAwesomeIcon icon={fas.faFileSignature} className="input-icon" />
                                    <input className='inputFormularioRegistro'
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
                                    <input className='inputFormularioRegistro'
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
                                    <input className='inputFormularioRegistro'
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
                                    <input className='inputFormularioRegistro'
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
                                    <select className="inputFormularioRegistro_select" name="titulacion_cursada" onChange={handleTitulacionChange}>
                                        <option value="" disabled selected hidden>Titulación cursada</option>
                                        <option value="ing_multimedia">Ing. Multimedia</option>
                                    </select>
                                </div>
                            </label>
                            <label htmlFor="repetir_contraseña">
                                <div className="input-icon-container_registro">
                                    <FontAwesomeIcon icon={fas.faUnlock} className="input-icon" />
                                    <input className='inputFormularioRegistro'
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

            {showModal && (
            <ConfirmarNuevoUsuario
                onClose={handleCloseModal}
                onConfirm={handleModalConfirm}
            />
      )}

        </div>

        
    );
  }