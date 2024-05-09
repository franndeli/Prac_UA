// Card.jsx
import React, { useState, useEffect } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function Card({ photoId }) {

  const [photoData, setPhotoData] = useState([]);

  const fetchPhotoData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/publicaciones/${photoId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la foto');
      }
      const data = await response.json();
      setPhotoData(data);
    } catch (error) {
      console.error('Error fetching photo data:', error);
    }
  };
  
  useEffect(() => {
    fetchPhotoData(); // Llamada inicial a la función
  }, [photoId]); // photoId es la única dependencia necesaria en este efecto

  return (

  <div>  
    {photoData.map((p) => (

      <div className="card" key = {p.id}>
      
        <div className="card-titulo">{p.Nombre}</div>
      
        <div className="card-imagen">
            <img src="https://via.placeholder.com/100" alt="Word Icon"></img>
        </div>

          <div className="card-icons">
            <FontAwesomeIcon className="icon-card" icon={fas.faHeart} color="red" /> {p.Likes}
            <FontAwesomeIcon className="icon-card" icon={fas.faEye }  /> {p.Visitas}
        </div>
        
          <div className="card-autor">
          {p.nombre_usuario}
          </div>
    </div>

    ))}
  </div> 
  );
}
