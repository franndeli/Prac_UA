import React from 'react';
import './Nav.css'; // Importa tu archivo CSS para estilos
import userLogo from './Logos/user.png';
import lupa from './Logos/lupa.png';
import masContent from './Logos/mas.png'
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

    const navigate = useNavigate(); // Obtiene la función de navegación

    const handleInicioClick = () => {
        // Redirige a la página principal
        navigate('/');
    };

    const handleInicioClickUser = () => {
        // Redirige a la página principal
        navigate('/Perfil-privado');
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><a href="" onClick={handleInicioClick}>Inicio</a></li>
                <li><a href="#">Tu Biblioteca</a></li>
                <li className="logo-item"><img src={masContent} alt="Logo para añadir contenido" /></li>
                <li className="logo-item"><img src={lupa} alt="Logo de la lupa de busqueda" /></li>
                <li className="logo-item"><a href="" onClick={handleInicioClickUser}><img src={userLogo} alt="Logo user" /></a></li>
            </ul>
        </nav>
    );
}
