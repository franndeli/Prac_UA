import React, { useState, useEffect } from 'react';
import './Categoria.css';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function Categoria() {

  const [titulaciones, setTitulaciones] = useState([]);

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

      fetchTitulaciones();
  }, []);

  return (
    <div className="categoria">
      <Nav></Nav>
      
      <h1 className="categoria_h1">RECOMENDACIONES</h1>
      <div className="categoria_body">
          <div className="categoria_selects">
            <select name="tipo_contenido" id="tipo_contenido">
                <option value="" disabled selected>Tipo</option>
                {/* Aquí se podrían agregar las opciones de tipos de contenido cuando estén disponibles */}
            </select>
            <select name="carrera" id="carrera">
                <option value="" disabled selected>Titulación cursada</option>
                {titulaciones.map(t => (
                    <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
            </select>
          </div>
          <div className='categoria_publicaciones'>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
          </div>
      </div>
    </div>
  );
}