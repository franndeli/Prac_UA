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
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [contenidoSeleccionado, setContenidoSeleccionado] = useState("");

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
        const nombreValido = foto.Nombre && foto.Nombre.toLowerCase().includes(busqueda.toLowerCase());
        const tipoValido = !tipoSeleccionado || foto.Tipo === tipoSeleccionado;
        const contenidoValido = !contenidoSeleccionado || foto.Contenidos === contenidoSeleccionado;
        return nombreValido && tipoValido && contenidoValido;
    });

    const handleTipoSeleccionado = (e) => {
        const valorSeleccionado = e.target.value;
        if (valorSeleccionado === "Tipo") {
          setTipoSeleccionado("");
        } else {
          setTipoSeleccionado(valorSeleccionado);
        }
      };

      const handleContenidoSeleccionado = (e) => {
        const valorSeleccionado = e.target.value;
        if (valorSeleccionado === "Contenidos") {
            setContenidoSeleccionado("");
        } else {
            setContenidoSeleccionado(valorSeleccionado);
        }
      };

    return (
      <div className="inicio">
        <Nav></Nav>
        
        <div className="search-bar">
                <input className="search-input" 
                    type="text" 
                    value={busqueda} 
                    onChange={(e) => setBusqueda(e.target.value)} 
                    placeholder="Buscar..." 
                />
            </div>

        <div className='SelectoresBuscar'>

            <select name="Tipo" id="Tipo" onChange={handleTipoSeleccionado}>
                <option selected>Tipo</option>
                <option>Word</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>Video</option>
                <option>Audio</option>
                <option>Otro</option>
            </select>

            <select name="Contenidos" id="Contenidos" onChange={handleContenidoSeleccionado}>
                <option selected>Contenidos</option>
                <option>Practicas</option>
                <option>TFG</option>
                <option>TFM</option>
                <option>Tesis</option>
                <option>Otros</option>
            </select>

        </div>

        <div className="recomendaciones">
                <div className="recomendaciones_icon">
                    <h2 className="recomendaciones_h2">Resultado de la búsqueda</h2>
                    <FontAwesomeIcon className="more_than_icon" icon={fas.faAngleRight} size="lg" />
                </div>
            <div className="cards-container">
                {fotosFiltradas.map((foto, index) => (
                <a href='publiDetalle'><Card key={index} photoId={foto.id} /></a>
                ))}
            </div>
        </div>
      </div>
    );
}