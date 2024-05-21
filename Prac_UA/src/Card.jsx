import React, { useState, useEffect } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Card({ photoId }) {
  const [photoData, setPhotoData] = useState([]);
  const ruta = "http://localhost:3001/uploads";
  const location = useLocation();
  const navigate = useNavigate();

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
      setPhotoData(data);

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

    } catch (error) {
      console.error('Error al desguardar la publicación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al desguardar la publicación.',
      });
    }
  };

  const BorrarPubli = async () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres borrar la publicación?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/api/borrarPubli/${photoId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            throw new Error('Error al borrar la publicación');
          }

          const data = await response.json();
          console.log('Publicación borrada:', data);

          Swal.fire({
            icon: 'success',
            title: 'Publicación eliminada',
            text: 'La publicación se ha eliminado correctamente de tu biblioteca.',
          }).then(() => {
            window.location.reload();
          });

        } catch (error) {
          console.error('Error al borrar la publicación:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al borrar la publicación.',
          });
        }
      }
    });
  };

  function determineCardColor(ruta_archivo) {
    // Verificar que ruta_archivo no sea undefined ni null
    if (ruta_archivo !== undefined && ruta_archivo !== null) {
        // Dividir la cadena en un array de rutas de archivo
        const filePaths = ruta_archivo.split(',');

        // Crear un objeto para contar las ocurrencias de cada extensión
        const extensionCounts = {};

        // Contar las ocurrencias de cada extensión
        filePaths.forEach(filePath => {
            const extension = filePath.split('.').pop();
            extensionCounts[extension] = (extensionCounts[extension] || 0) + 1;
        });

        // Encontrar la extensión con más ocurrencias
        let mostCommonExtension = '';
        let maxCount = 0;
        for (const extension in extensionCounts) {
            if (extensionCounts[extension] > maxCount) {
                mostCommonExtension = extension;
                maxCount = extensionCounts[extension];
            }
        }

        console.log(maxCount);
        console.log(mostCommonExtension);

        // Asignar el color en base a la extensión más común
        switch (mostCommonExtension) {
            case 'pdf':
                return '-blue';
            case 'txt':
                return '-green';
            case 'png':
            case'jpg':
            case 'jpeg':
                return '-yellow';
            default:
                return '-grey';
        }
    } else {
        console.error('La cadena ruta_archivo es undefined o null.');
        return 'gray'; // O devuelve un color predeterminado en caso de error
    }
}


  useEffect(() => {
    fetchPhotoData();
  }, [photoId]);

  return (
    <div>
  {photoData.map((p) => (
    <div className={`card${determineCardColor(p.ruta_archivo_array)}`} key={p.id}>
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
        <div className='NombreCard'>{p.nombre_usuario}</div>
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
          {location.pathname === '/perfil-privado' && (
            <>
              <FontAwesomeIcon
                className="icon-card-borrar"
                size="lg"
                icon={fas.faTrash}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  BorrarPubli();
                }}
              />
              <FontAwesomeIcon
                className="icon-card-editar"
                size="lg"
                icon={fas.faEdit}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/editar-archivo/${p.id}`);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
  )
}
