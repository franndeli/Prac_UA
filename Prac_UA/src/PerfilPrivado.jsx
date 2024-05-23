import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import { useEffect, useState } from 'react';
import './PerfilPrivado.css'; // Importa el CSS por defecto
import './PerfilPrivadoOscuro.css'; // Importa el CSS oscuro
import AdjustableSelect from './helpers/AdjustableSelects.jsx';
import Swal from 'sweetalert2';

export default function PerfilPrivado() {

  const ruta = "http://localhost:3001/uploads/resized";
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
    const tipoValido = !tipo_contenido || publicacion.TiAc_Nombre === tipo_contenido;
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
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Limpiar el localStorage
          localStorage.removeItem('id_usuario');
          localStorage.removeItem('usuario');
          localStorage.removeItem('recuerdame');
          // Redirigir a la página de inicio de sesión
          navigate('/iniciarsesion');
        } catch (error) {
          console.error('Error al cerrar sesión', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cerrar sesión',
          });
        }
      }
    });
  };

  return (
    <div >
      {datosPublicos.map((p) => (
        <div key={p.ID} className="inicio">
          <Nav />
          <h1>Mi perfil</h1>
          <div className='container'>
            <div className={p.color === "Claro" ? 'InfoUsuario' : 'InfoUsuario-dark'}>
              <div className='InfoUsuarioImage'>
              <img 
                  className="Img-archivo-Perfil" 
                  src={ruta + '/' + encodeURIComponent(p.foto)} 
                  alt="archivo" 
                  />
              </div>
              <div className='InfoUsuarioText'>
                <h2>{p.nombre}</h2>
                <h4>{p.nombre_titulacion}</h4>
                <p>{p.descripcion}</p>
              </div>
            </div>
            <div className='BotonesAlaDerecha'>
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
          </div>
          <div className='PublicacionesPrivado'>
            <h2 className='PubliPrivate'>Publicaciones</h2>
            <div className='select-container-Publico'>
            <div className='SelectoresBuscar'>
            <select className="textarea-subir-select-perfil" id="tipo-archivo" name="tipoArchivo" value={tipo_contenido} onChange={handleTipoSeleccionado}>
                <option value="" selected>Tipo de contenido</option>
                {tipo_contenidos.map(tipo => (
                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))}
            </select>
            </div>
            </div>
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

  