import './PerfilPublico.css';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import React from 'react';
import { useEffect, useState } from 'react';
import { wait } from '@testing-library/user-event/dist/utils/index.js';

export default function PerfilPublico() {

  const [PerfilPublico, setDatosPrivados] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);

  const fetchPublico = async () => {
    try{
      const response = await fetch ('http://localhost:3001/api/perfil')
      if(!response.ok){
        throw new Error ('Error al obtener los datos del servidor !!')
      }

      const data = await response.json()
      setDatosPrivados(data)
    }catch(error){
      console.log('Error al obtener los datos !!')
    }
  };

  const fetchPublicaciones = async () => {
    try{
      const response = await fetch ('http://localhost:3001/api/misPublicaciones')
      if(!response.ok){
        throw new Error ('Error al obtener las publicaciones del servidor !!')
      }

      const data = await response.json()
      setPublicaciones(data)
    }catch(error){
      console.log('Error al obtener los datos !!')
    }
  };

  useEffect (() => {
    fetchPublico();
    fetchPublicaciones();
  }, )

    return (
      <div>
       <div><Nav></Nav></div> 
        <h1>Perfil de Pablo</h1>
        <div className='container'>
          <div className='InfoUsuario'>
            <div className='InfoUsuarioImage'>
              <p>Poner Imagen</p>
            </div>
            {PerfilPublico.map((p) => (
              <div className='InfoUsuarioText' key = {p.id}>
                <p>{p.nombre}</p>
                <p>{p.titulacion}</p>
                <p>{p.descripcion}</p>
                
              </div>
            ))}
          </div>
        </div>
  
        <div className='PublicacionesPublico'>
            <h2 className='PubliPublico'>Publicaciones</h2>
                <div className='select-container-Publico'>
                    <label className='TipoContenidoPublico'>Tipo de contenido</label>
                        <select name="Tipo" id="Tipo">
                            <option>TFG</option>
                            <option>TFM</option>
                        </select>
                </div>
                <div className="cards-container">
                  {publicaciones.map(publicacion => (
                    <Card key={publicacion.id} photoId={publicacion.id} className="card"/>
                  ))}
              </div>
        </div>

      </div>
    );
  }