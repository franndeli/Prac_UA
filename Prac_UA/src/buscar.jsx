import React, { useState, useEffect } from 'react';
import './buscar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';
import Nav from './Nav.jsx';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

export default function Buscar() {
    const [fotos, setFotos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [tipoContenidos, setTipoContenidos] = useState([]);

    useEffect(() => {
        fetchFotos();
        fetchTipoAcademico();
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

    const fetchTipoAcademico = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tipo_academico');
            if (!response.ok) {
                throw new Error('Error al cargar tipo académico');
            }
            const data = await response.json();
            setTipoContenidos(data);
        } catch (error) {
            console.error('Error al cargar los tipos académicos:', error);
        }
    };

    const fotosFiltradas = fotos.filter(foto => {
        const nombreValido = foto.titulo && foto.titulo.toLowerCase().includes(busqueda.toLowerCase());
        const tipoValido = !tipoSeleccionado || foto.TiAc_Nombre === tipoSeleccionado;
        return nombreValido && tipoValido;
    });

    const handleTipoSeleccionado = (e) => {
        const valorSeleccionado = e.target.value;
        console.log('Valor seleccionado:', valorSeleccionado); // Agrega esta línea para depurar
        setTipoSeleccionado(valorSeleccionado === "Tipo" ? "" : valorSeleccionado);
    };

    return (
        <div className="inicio">
            <Nav />
            
            <div className="search-bar">
                <input 
                    className="search-input" 
                    type="text" 
                    value={busqueda} 
                    onChange={(e) => setBusqueda(e.target.value)} 
                    placeholder="Buscar..." 
                />
            </div>

            <div className='SelectoresBuscar'>
            <select className="textarea-subir-select-buscar" id="tipo-archivo" name="tipoArchivo" value={tipoSeleccionado} onChange={handleTipoSeleccionado}>
                <option value="" selected>Tipo de contenido</option>
                {tipoContenidos.map(tipo => (
                    <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                ))}
            </select>
            </div>

            <div className="recomendaciones">
                <div className="recomendaciones_icon">
                    <h2 className="recomendaciones_h2">Resultado de la búsqueda</h2>
                    <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                </div>
                <div className="cards-container">
                    {fotosFiltradas.map((foto, index) => (
                        <a href={`publiDetalle?id=${foto.id}`} key={index}>
                            <Card photoId={foto.id} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}