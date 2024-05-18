import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import './PerfilPublico.css';
import { Link } from 'react-router-dom';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function PerfilPublico() {

  const ruta = "http://localhost:3001/uploads/resized";
  const [datosPublicos, setDatosPublicos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const location = useLocation();
  const [tipo_contenido, setTipoSeleccionadoTipo] = useState("");
  const [tipo_contenidos, setTipoSeleccionados] = useState([]);
  const userId = new URLSearchParams(location.search).get("userId");
  console.log(userId);

  const fetchPublico = async () => {
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:3001/api/perfil/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor !!');
      }

      const data = await response.json();
      setDatosPublicos(data);
    } catch (error) {
      console.log('Error al obtener los datos !!', error);
    }
  };

  const fetchPublicaciones = async (userId) => {
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:3001/api/misPublicaciones/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener las publicaciones del servidor !!');
      }
  
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.log('Error al obtener las publicaciones !!', error);
    }
  };

  const fotosFiltradas = publicaciones.filter(publicacion => {
    const nombreValido = publicacion.titulo;
    const tipoValido = !tipo_contenido || publicacion.TiAc_Nombre === tipo_contenido;
    return nombreValido && tipoValido;
  });

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionado(valorSeleccionado === "Tipo" ? "" : valorSeleccionado);
  };

  useEffect(() => {
    fetchPublico();
    fetchTipo_academico();
    fetchPublicaciones(userId);
  }, [userId]);

  const handleTipoSeleccionadoTipo = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionadoTipo(valorSeleccionado);
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

  return (
    <div>
      <Nav />
      {datosPublicos.map((p) => (
        <div key={p.id}>
          <h1>Perfil de {p.usuario}</h1>
          <div className='container'>
            <div className='InfoUsuario'>
              <div className='InfoUsuarioImage'>
              <img 
                  className="Img-archivo-Perfil" 
                  src={ruta + '/' + encodeURIComponent(p.foto)} 
                  alt="archivo" 
                  />
              </div>
              <div className='InfoUsuarioText'>
                <p>{p.nombre}</p>
                <p>{p.nombre_titulacion}</p>
                <p>{p.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='PublicacionesPublico'>
        <h2 className='PubliPublico'>Publicaciones</h2>
        <div className='select-container-Publico'>
        <select className="textarea-subir-select-perfil" id="tipo-archivo" name="tipoArchivo" value={tipo_contenido} onChange={handleTipoSeleccionadoTipo}>
                <option value="" selected>Tipo de contenido</option>
                {tipo_contenidos.map(tipo => (
                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))}
            </select>
        </div>
          <div className="cards-container">
            {fotosFiltradas.map(publicacion => (
              <Link to={`/publiDetalle?id=${publicacion.id}`} key={publicacion.id}>
                <Card photoId={publicacion.id} />
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}