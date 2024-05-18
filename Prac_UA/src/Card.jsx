import React, { useState, useEffect } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Card({ photoId }) {

  const [photoData, setPhotoData] = useState([]);
  const ruta = "http://localhost:3001/uploads";
  const location = useLocation();

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

      console.log(photoId);
      // Actualizar el estado con los datos y la URL de la imagen
      setPhotoData(data);

      // console.log(data);

    } catch (error) {
      console.error('Error fetching photo data:', error);
    }
  };

  const handleDesguardarPubli = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/desguardarPubli/${photoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al desguardar la publicación');
        }

        const data = await response.json();
        console.log('Publicación desguardada:', data);
    
        Swal.fire({
            icon: 'success',
            title: 'Publicación eliminada',
            text: 'La publicación se ha eliminado correctamente de tu biblioteca.',
        }).then(() => {
            window.location.reload();
        });

        // // Actualiza el estado de datosUser
        // setUser(prevState => 
        //     prevState.map(user => 
        //         user.id_usuario === storedUserId ? { ...user, guardado: 1 } : user
        //     )
        // );
    } catch (error) {
        console.error('Error al desguardar la publicación:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al desguardar la publicación.',
        });
    }
  };

  useEffect(() => {
    fetchPhotoData(); 
  }, [photoId]);

  return (
    <div>
      {photoData.map((p) => (
        <div className="card" key={p.id}>
          <Link to={`/publiDetalle?id=${p.id}`} className="card-link">
            <div className="card-titulo">{p.titulo}</div>
            <div className="card-imagen">
              <img src={`${ruta}/${encodeURIComponent(p.ruta_archivo)}`} className="ouyeah_foto" alt="Word Icon" />
            </div>
          </Link>
          <div className="card-icons">
            <FontAwesomeIcon className="icon-card" icon={fas.faHeart} color="red" /> {p.likes}
            <FontAwesomeIcon className="icon-card" icon={fas.faEye} /> {p.visitas}
          </div>
          <div className="card-autor">
            <div>{p.nombre_usuario}</div>
            <div className="icono_guardar_tu_biblioteca">
              {location.pathname === '/tu_biblioteca' && (
                <FontAwesomeIcon
                  className="icon-card-guardado"
                  size="lg"
                  icon={fas.faBookmark}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDesguardarPubli();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
