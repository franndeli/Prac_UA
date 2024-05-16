import React, { useState, useEffect } from 'react';
import './Categoria.css';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function Categoria() {
  const [titulaciones, setTitulaciones] = useState([]);
  const [tipo_academico, setTipo_academico] = useState([]);
  const [titulo, setTitulo] = useState('RECOMENDACIONES');
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchTitulaciones = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/titulaciones');
        if (!response.ok) {
          throw new Error('Error al cargar titulaciones');
        }
        const data = await response.json();
        setTitulaciones(data);
      } catch (error) {
        console.error('Error al cargar las titulaciones:', error);
      }
    };

    const fetchFotos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/publicaciones');
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
    fetchTitulaciones();
    fetchFotos();

    const params = new URLSearchParams(window.location.search);
    const tituloParam = params.get('titulo');
    if (tituloParam) {
      setTitulo(tituloParam);
    }
  }, []);

  return (
    <div className="categoria">
      <Nav />
      <h1 className="categoria_h1">{titulo}</h1>
      <div className="categoria_body">
        <div className="categoria_selects">
          <AdjustableSelect options={tipo_academico} defaultText="Tipo" /> {/* Ajusta el array `options` según tus necesidades */}
          <AdjustableSelect options={titulaciones} defaultText="Titulación cursada" />
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
