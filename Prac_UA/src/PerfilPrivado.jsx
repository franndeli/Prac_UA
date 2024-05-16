import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import { useEffect, useState } from 'react';
import './PerfilPrivado.css'; // Importa el CSS por defecto
import './PerfilPrivadoOscuro.css'; // Importa el CSS oscuro

export default function PerfilPrivado() {

  const [datosPublicos, setDatosPublicos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const storedUserId = localStorage.getItem('id_usuario');

  const fetchPublico = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/perfil/${storedUserId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor !!');
      }

      const data = await response.json();
      setDatosPublicos(data);
    } catch (error) {
      console.log('Error al obtener los datos !!');
    }
  };

  const fetchPublicaciones = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/misPublicaciones/${storedUserId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las publicaciones del servidor !!');
      }
  
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.log('Error al obtener las publicaciones !!');
    }
  };

  const fotosFiltradas = publicaciones.filter(publicacion => {
    const nombreValido = publicacion.titulo;
    const tipoValido = !tipoSeleccionado || publicacion.tipo_archivo === tipoSeleccionado;
    return nombreValido && tipoValido;
  });

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    if (valorSeleccionado === "Tipo") {
      setTipoSeleccionado("");
    } else {
      setTipoSeleccionado(valorSeleccionado);
    }
  };

  useEffect(() => {
    fetchPublico();
    fetchPublicaciones();
  }, []);

  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const handleEditarPerfilClick = () => {
    // Redirigir a la página de edición de perfil
    navigate('/Formulario');
  };

  const handleCerrarSesion = () => {
    // Limpiar el localStorage
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('recuerdame');
    // Redirigir a la página de inicio de sesión
    navigate('/iniciarsesion');
  };

  return (
    <div>
      {datosPublicos.map((p) => (
        <div key={p.ID}>
          <Nav />
          <h1>Mi perfil</h1>
          <div className='container'>
            <div className={p.color === "Claro" ? 'InfoUsuario' : 'InfoUsuario-dark'}>
              <div className='InfoUsuarioImage'>
                <p>Poner Imagen</p>
              </div>
              <div className='InfoUsuarioText'>
                <p>{p.nombre}</p>
                <p>{p.titulacion}</p>
                <p>{p.descripcion}</p>
              </div>
            </div>
            <div className='button-custom'>
              <button className={p.color === "Claro" ? 'custom-button-blue': 'custom-button-blue-dark'} onClick={handleEditarPerfilClick}>
                Editar Perfil
              </button>
            </div>
            <div className='button-custom'>
              <button className={p.color === "Claro" ? 'custom-button-blue': 'custom-button-blue-dark'} onClick={handleCerrarSesion}>
                Cerrar sesion
              </button>
            </div>
          </div>
          <div className='PublicacionesPrivado'>
            <h2 className='PubliPrivate'>Publicaciones</h2>
            <div className={p.color === "Claro" ? 'select-container-privado' : 'select-container-privado-dark'}>
              <select name="Tipo" id="Tipo" onChange={handleTipoSeleccionado}>
                <option selected>Tipo</option>
                <option>Word</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>Video</option>
                <option>Audio</option>
                <option>Practicas</option>
                <option>TFG</option>
                <option>TFM</option>
                <option>Tesis</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="cards-container">
              {fotosFiltradas.map(publicacion => (
                <Card key={publicacion.id} photoId={publicacion.id} className="card"/>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}