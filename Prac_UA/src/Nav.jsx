import { React } from 'react';
import { useLocation } from 'react-router-dom';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo512.png';

export default function Navbar() {
    const currentPage = useLocation();
    // console.log(currentPage);
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo web"/>
            <div className="nav-container">
                <ul className="nav-list">
                    <li className={currentPage.pathname === '/inicio' ? 'active' : ''}><a href='/inicio'>Inicio</a></li>
                    <li className={currentPage.pathname === '/tu_biblioteca' ? 'active' : ''}><a href='/tu_biblioteca'>Tu Biblioteca</a></li>
                </ul>
            </div>
            <div className="icons-menu">
                <ul className="icons-menu-list">
                    <li className="logo-item"><a href='/subir-archivo'><FontAwesomeIcon icon={fas.faCirclePlus} size="2xl" style={{color: "#ffffff",}} /></a></li>
                    <li className="logo-item"><a href='/buscar'><FontAwesomeIcon icon={fas.faMagnifyingGlass} size="xl" style={{color: "#000000",}} /></a></li>
                    <li className="logo-item"><a href='/perfil-privado'><FontAwesomeIcon icon={fas.faUser} size="xl" style={{color: "#000000",}} /></a></li>
                </ul>
            </div>
        </nav>
    );
      
}
