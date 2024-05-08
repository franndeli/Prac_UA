import React, { useState, useEffect } from 'react';
import './buscar.css';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function Buscar() {

    const [fotos, setFotos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetchFotos();
    }, []);

    const fetchFotos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/publicaciones');
            if (!response.ok) {
                throw new Error('Error al obtener las fotos del servidor');
            }
            const data = await response.json();
            setFotos(data);
        } catch (error) {
            console.error('Error al obtener las fotos:', error);
        }
    };

    const fotosFiltradas = fotos.filter(foto => {
        return foto.Nombre && foto.Nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
      <div className="inicio">
        <Nav></Nav>
        
        <div className="search-bar">
                <input 
                    type="text" 
                    value={busqueda} 
                    onChange={(e) => setBusqueda(e.target.value)} 
                    placeholder="Buscar..." 
                />
            </div>

        <div className="recomendaciones">
            <a href="/categoria">
                <div className="recomendaciones_icon">
                    <h2 className="recomendaciones_h2">RECOMENDACIONES</h2>
                    <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                </div>
            </a>
            <div className="cards-container">
                {fotosFiltradas.map((foto, index) => (
                <Card key={index} photoId={foto.id} />
                ))}
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