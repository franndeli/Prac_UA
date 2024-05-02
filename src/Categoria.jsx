import React from 'react';
import './Categoria.css';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function Categoria() {
    return (
      <div className="categoria">
        <Nav></Nav>
        
        <h1 className="categoria_h1">RECOMENDACIONES</h1>
        <div className="categoria_body">
            <div className="categoria_selects">
                <select name="tipo_contenido" id="tipo_contenido">

                </select>
                <select name="carrera" id="carrera">

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