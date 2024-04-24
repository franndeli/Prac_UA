import React from 'react';
import './IniciarSesion.css';
import logo from './images/logo512.png';

export default function IniciarSesion() {

    return (
        <div className='iniciar-sesion'>
            <div className="titulo-web">
                <img src={logo} alt="Logo de la web"></img>
                <h1>Mi perfil</h1>
            </div>
        </div>
    );
  }