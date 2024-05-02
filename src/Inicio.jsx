import React from 'react';
import './Inicio.css';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function Inicio() {
    return (
      <div className="inicio">
        <Nav></Nav>
        
        <div className="recomendaciones">
            <a href="/categoria">
                <div className="recomendaciones_icon">
                    <h2 className="recomendaciones_h2">RECOMENDACIONES</h2>
                    <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                </div>
            </a>
            <div className="pagina_inicio">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
        <div className="recomendaciones">
            <a href="/categoria">
                <div href="/categorias" className="recomendaciones_icon">
                    <h2 className="recomendaciones_h2">TUS ÚLTIMOS TRABAJOS VISTOS</h2>
                    <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                </div>
            </a>
            <div className="pagina_inicio">
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