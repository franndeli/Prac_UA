import React, { useState, useEffect } from 'react';
import './UltimosTrabajosVistos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function UltimosTrabajosVistos() {

    const [fotos, setFotos] = useState([]);

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
            
            // Reorganiza las fotos para que el último trabajo visto aparezca primero
            const fotosOrdenadas = data.reverse();
            
            setFotos(fotosOrdenadas);
        } catch (error) {
            console.error('Error al obtener las fotos:', error);
        }
    };

    return (
        <div className="inicio">
            <Nav />
            <div className="recomendaciones">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">TUS ÚLTIMOS TRABAJOS VISTOS</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <a href='publiDetalle' key={index}><Card photoId={foto.id} /></a>
                    ))}
                </div>
            </div>
        </div>
    );
}