import React from 'react';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo512.png';

export default function Navbar() {

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo web"/>
            <div className="nav-container">
                <ul className="nav-list">
                    <li><a href='/inicio'>Inicio</a></li>
                    <li><a href='/tu_biblioteca'>Tu Biblioteca</a></li>
                </ul>
            </div>
            <div className="icons-menu">
                <ul className="icons-menu-list">
                    <li className="logo-item"><FontAwesomeIcon icon={fas.faCirclePlus} size="2xl" style={{color: "#ffffff",}} /></li>
                    <li className="logo-item"><FontAwesomeIcon icon={fas.faMagnifyingGlass} size="xl" style={{color: "#000000",}} /></li>
                    <li className="logo-item"><a href='/perfil-privado'><FontAwesomeIcon icon={fas.faUser} size="xl" style={{color: "#000000",}} /></a></li>
                </ul>
            </div>
        </nav>
    );
      
}
