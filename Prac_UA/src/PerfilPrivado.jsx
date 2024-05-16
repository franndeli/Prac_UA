import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import { useEffect, useState } from 'react';
import './PerfilPrivado.css'; // Importa el CSS por defecto
import './PerfilPrivadoOscuro.css'; // Importa el CSS oscuro
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function PerfilPrivado() {

  const [datosPublicos, setDatosPublicos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [tipo_contenido, setTipoSeleccionado] = useState("");
  const [tipo_contenidos, setTipoSeleccionados] = useState([]);

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
    const tipoValido = !tipo_contenido || publicacion.tipo_archivo === tipo_contenido;
    return nombreValido && tipoValido;
  });

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionado(valorSeleccionado);
  }

  const fetchTipo_academico = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tipo_academico');
      if (!response.ok) {
        throw new Error('Error al cargar tipo_academico');
      }
      const data = await response.json();
      setTipoSeleccionados(data);
    } catch (error) {
      console.error('Error al cargar las tipo_academico:', error);
    }
  };

  useEffect(() => {
    fetchPublico();
    fetchPublicaciones();
    fetchTipo_academico();
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
            <AdjustableSelect options={tipo_contenidos} defaultText="Tipo" />
            <div className="cards-container">
              {fotosFiltradas.map(publicacion => (
                <a href={`/publiDetalle?id=${publicacion.id}`}>
                  <Card key={publicacion.id} photoId={publicacion.id} className="card"/>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

  