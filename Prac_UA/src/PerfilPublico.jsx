import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import './PerfilPublico.css';
import { Link } from 'react-router-dom';

export default function PerfilPublico() {
  const [datosPublicos, setDatosPublicos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const location = useLocation();
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
    const tipoValido = !tipoSeleccionado || publicacion.tipo_archivo === tipoSeleccionado;
    return nombreValido && tipoValido;
  });

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionado(valorSeleccionado === "Tipo" ? "" : valorSeleccionado);
  };

  useEffect(() => {
    fetchPublico();
    fetchPublicaciones(userId);
  }, [userId]);

  return (
    <div>
      <Nav />
      {datosPublicos.map((p) => (
        <div key={p.id}>
          <h1>Perfil de {p.usuario}</h1>
          <div className='container'>
            <div className='InfoUsuario'>
              <div className='InfoUsuarioImage'>
                <p>Poner Imagen</p>
              </div>
              <div className='InfoUsuarioText'>
                <p>{p.nombre}</p>
                <p>{p.titulacion}</p>
                <p>{p.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='PublicacionesPublico'>
        <h2 className='PubliPublico'>Publicaciones</h2>
        <div className='select-container-Publico'>
          <select name="Tipo" id="Tipo" onChange={handleTipoSeleccionado}>
            <option defaultValue>Tipo</option>
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
              <Link to={`/publiDetalle?id=${publicacion.id}`} key={publicacion.id}>
                <Card photoId={publicacion.id} />
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}