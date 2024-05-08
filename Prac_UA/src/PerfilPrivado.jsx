import React from 'react';
import './PerfilPrivado.css';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx'
import { useEffect, useState } from 'react';

export default function PerfilPrivado() {

  const [datosPublicos, setDatosPublicos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const fetchPublico = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/perfil');
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
      const response = await fetch('http://localhost:3001/api/misPublicaciones');
      if (!response.ok) {
        throw new Error('Error al obtener las publicaciones del servidor !!');
      }

      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.log('Error al obtener las publicaciones !!');
    }
  };

  useEffect(() => {
    fetchPublico();
    fetchPublicaciones();
  }, []);

  const fotosFiltradas = publicaciones.filter(publicacion => {
    const nombreValido = publicacion.Nombre;
    const tipoValido = !tipoSeleccionado || publicacion.Tipo === tipoSeleccionado;
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

  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const handleEditarPerfilClick = () => {
    // Redirigir a la página de edición de perfil
    navigate('/Formulario');
  };

    return (
      <div className="perfil-privado">
        <Nav></Nav>
        <h1>Mi perfil</h1>
        <div className='container'>
          <div className='InfoUsuario'>
            <div className='InfoUsuarioImage'>
              <p>Poner Imagen</p>
            </div>

            {datosPublicos.map((p) => (
              <div className='InfoUsuarioText' key = {p.ID}>
                <p>{p.nombre}</p>
                <p>{p.titulacion}</p>
                <p>{p.descripcion}</p>
                
              </div>
            ))}
              
          </div>
          <div className='button-custom'>
                <button className='custom-button-blue' onClick={handleEditarPerfilClick}>
                    Editar Perfil
                </button>
            </div>
        </div>
  
        <div className='PublicacionesPrivado'>
            <h2 className='PubliPrivate'>Publicaciones</h2>
                <div className='select-container-privado'>
                    <select name="Tipo" id="Tipo" onChange={handleTipoSeleccionado}>
                      <option selected>Tipo</option>
                      <option>Word</option>
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>Video</option>
                      <option>Audio</option>
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
    );
  }