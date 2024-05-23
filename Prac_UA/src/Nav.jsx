import React, { useState } from 'react';
import './Nav.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import logo from '../src/images/fotoWEB.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const currentPage = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo web"/>
            <button className="menu-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={fas.faBars} size="2xl"/>
            </button>
            <div className={`nav-container ${isOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    <li className={currentPage.pathname === '/inicio' ? 'active' : ''} id="inixi"><FontAwesomeIcon icon={fas.faHouse} /><a href='/inicio'>Inicio</a></li>
                    <li className={currentPage.pathname === '/tu_biblioteca' ? 'active' : ''} id="biblix"><FontAwesomeIcon icon={fas.faBook} /><a href='/tu_biblioteca'>Tu Biblioteca</a></li>
                </ul>
            </div>
            <div className={`icons-menu ${isOpen ? 'open' : ''}`}>
                <ul className="icons-menu-list">
                    <li className="logo-item1"><a href='/subir-archivo'><FontAwesomeIcon icon={fas.faCirclePlus} size="2xl" style={{color: "#ffffff",}} /></a></li>
                    <li className="logo-item2"><a href='/buscar'><FontAwesomeIcon icon={fas.faMagnifyingGlass} size="xl" style={{color: "#000000",}} /></a></li>
                    <li className="logo-item3"><a href='/perfil-privado'><FontAwesomeIcon icon={fas.faUser} size="xl" style={{color: "#000000",}} /></a></li>
                </ul>
            </div>
        </nav>
    );
}
