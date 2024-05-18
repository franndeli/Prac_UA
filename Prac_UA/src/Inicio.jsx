import React, { useState, useEffect } from 'react';
import './Inicio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';

export default function Inicio() {
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

            // Limita la cantidad de fotos a 5
            const fotosLimitadas = fotosOrdenadas.slice(0, 5);
            
            setFotos(fotosLimitadas);
        } catch (error) {
            console.error('Error al obtener las fotos:', error);
        }
    };

    return (
        <div className="inicio">
            <Nav />
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=RECOMENDACIONES" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">RECOMENDACIONES</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=TUS ÚLTIMOS TRABAJOS VISTOS" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">TUS ÚLTIMOS TRABAJOS VISTOS</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=MÁS POPULARES" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">MÁS POPULARES</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=FAVORITOS DEL PROFESORADO" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">FAVORITOS DEL PROFESORADO</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=RECIÉN SUBIDOS" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">RECIÉN SUBIDOS</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="recomendaciones">
                <Link to="/categoria?titulo=PROYECTOS INTERNACIONALES" className="recomendaciones_link">
                    <div className="recomendaciones_icon">
                        <h2 className="recomendaciones_h2">PROYECTOS INTERNACIONALES</h2>
                        <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                    </div>
                </Link>
                <div className="cards-container">
                    {fotos.map((foto, index) => (
                        <Link to={`/publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
