import React, { useState, useEffect } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function Card({ photoId }) {

  const [photoData, setPhotoData] = useState([]);
  const ruta = "http://localhost:3001/uploads/resized";

  const fetchPhotoData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/publicaciones/${photoId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la foto');
      }
      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No se encontraron datos para la foto');
      }

      // Actualizar el estado con los datos y la URL de la imagen
      setPhotoData(data);

      console.log(data);

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
        <div className="card" key={p.id}>
          <div className="card-titulo">{p.titulo}</div>
          <div className="card-imagen">
            {/* Utiliza la URL de la imagen recibida del servidor */}
            <img src={ruta + "/" + encodeURIComponent(p.ruta_archivo)} alt="Word Icon" />
          </div>
          <div className="card-icons">
            <FontAwesomeIcon className="icon-card" icon={fas.faHeart} color="red" /> {p.likes}
            <FontAwesomeIcon className="icon-card" icon={fas.faEye} /> {p.visitas}
          </div>
          <a href={`/perfil-publico?userId=${p.id_usuario}`}>
            <div className="card-autor">
              {p.nombre_usuario}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}