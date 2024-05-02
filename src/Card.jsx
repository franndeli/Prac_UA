// Card.jsx
import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function Card() {
  return (
    <div className="card">
      <div className="card-titulo">Título del documento</div>
        <div className="card-imagen">
            <img src="https://via.placeholder.com/100" alt="Word Icon"></img>
        </div>
        <div className="card-icons">
          <FontAwesomeIcon className="icon-card" icon={fas.faHeart} color="red" /> 100
          <FontAwesomeIcon className="icon-card" icon={fas.faEye }  /> 150
        </div>
        <div className="card-autor">
          Juan Pérez González
        </div>
    </div>
  );
}
