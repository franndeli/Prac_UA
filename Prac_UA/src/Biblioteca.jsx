import React, { useState, useEffect } from 'react';
import './Categoria.css';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function Categoria() {
  const [tipo_academico, setTipo_academico] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [tipo_contenido, setTipoSeleccionado] = useState("");

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/biblioteca');
        if (!response.ok) {
          throw new Error('Error al obtener las fotos del servidor');
        }
        const data = await response.json();
        const fotosOrdenadas = data.reverse();
        const fotosLimitadas = fotosOrdenadas.slice(0, 5);
        setFotos(fotosLimitadas);
      } catch (error) {
        console.error('Error al obtener las fotos:', error);
      }
    };

    const fetchTipo_academico = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/tipo_academico');
          if (!response.ok) {
            throw new Error('Error al cargar tipo_academico');
          }
          const data = await response.json();
          setTipo_academico(data);
        } catch (error) {
          console.error('Error al cargar las tipo_academico:', error);
        }
      };
    
    fetchTipo_academico();
    fetchFotos();
  }, []);

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionado(valorSeleccionado);
  }


  const fotosFiltradas = fotos.filter(publicacion => {
    const nombreValido =!tipo_contenido || publicacion.TipoAcademicoNombre === tipo_contenido;
    const tipoValido = !tipo_academico || publicacion.tipo_academico === tipo_contenido;
    return nombreValido && tipoValido;
  });


  return (
    <div className="categoria">
      <Nav />
      <h1 className="categoria_h1">TU BIBLIOTECA</h1>
      <div className="categoria_body">
        <div className="categoria_selects">
        <select className="textarea-subir-select-perfil" id="tipo-archivo" name="tipoArchivo" value={tipo_academico} onChange={handleTipoSeleccionado}>
                <option value="" selected>Tipo de contenido</option>
                {fotosFiltradas.map(tipo => (
                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))}
            </select>
        </div>
      </div>
      <div className='categoria_publicaciones'>
          {fotos.map(foto => (
            <Card key={foto.id} photoId={foto.id} />
          ))}
        </div>
    </div>
  );
}
