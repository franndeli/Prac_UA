import React, { useState, useEffect } from 'react';
import './Categoria.css';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function Categoria() {
  const [tipo_academico, setTipo_academico] = useState([]);
  const [titulo, setTitulo] = useState('RECOMENDACIONES');
  const [fotos, setFotos] = useState([]);
  const [tipo_contenido, setTipoSeleccionado] = useState("");

  useEffect(() => {

    const fetchFotos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/publicaciones');
        if (!response.ok) {
          throw new Error('Error al obtener las fotos del servidor');
        }
        const data = await response.json();
        const fotosOrdenadas = data.reverse();
        setFotos(fotosOrdenadas);
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

    const params = new URLSearchParams(window.location.search);
    const tituloParam = params.get('titulo');
    if (tituloParam) {
      setTitulo(tituloParam);
    }
  }, []);

  const fotosFiltradas = fotos.filter(fotos => {
    const nombreValido = fotos.titulo;
    const tipoValido = !tipo_contenido || fotos.TiAc_Nombre === tipo_contenido;
    return nombreValido && tipoValido;
  });

  const handleTipoSeleccionado = (e) => {
    const valorSeleccionado = e.target.value;
    setTipoSeleccionado(valorSeleccionado);
  }

  return (
    <div className="categoria">
      <Nav />
      <h1 className="categoria_h1">{titulo}</h1>
      <div className="categoria_body">
      <div className='SelectoresBuscar'>
            <select className="textarea-subir-select-buscar" id="tipo-archivo" name="tipoArchivo" value={tipo_contenido} onChange={handleTipoSeleccionado}>
                <option value="" selected>Tipo de contenido</option>
                {tipo_academico.map(tipo => (
                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))}
            </select>
            </div>
      </div>
      <div className='categoria_publicaciones'>
          {fotosFiltradas.map(foto => (
            <Card key={foto.id} photoId={foto.id} />
          ))}
        </div>
    </div>
  );
}
