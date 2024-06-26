import React from 'react';
import iconoSubir from './images/cam.svg';
import  { useState } from 'react';
import './SubirArchivo.css'; // Asegúrate de que los estilos están enlazados
import camDefault from './images/cam_default.png';
import Nav from './Nav.jsx'

const SubirArchivo = () => {
    const [imagePreview, setImagePreview] = useState(camDefault); // Estado para manejar la previsualización de la imagen
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    return (
        <>
            <div><Nav></Nav></div> 
            <div className="SubirArchivo-container">
            <legend>SUBIR ARCHIVO</legend>
                <fieldset>
                    
                    <div className="cont1">
                    <div className="form-group">
                        <label htmlFor="titulo">Título:</label>
                        <input type="text" id="titulo" name="titulo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="etiquetas">Etiquetas:</label>
                        <input type="text" id="etiquetas" name="etiquetas" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tipo-archivo">Tipo de Contenido:</label>
                        <select id="tipo-archivo" name="tipo-archivo">
                            <option >TFG</option>
                            <option >TFM</option>
                            <option>Práctica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea id="descripcion" name="descripcion" />
                    </div>
                    </div>
                    <div className="cont2">
                    <div className="form-group imagen-subida">
                        <div className="image-upload-container">
                            <img src={imagePreview} alt="Imagen por defecto" className="image-preview" /> {/* Previsualización de la imagen */}
                            <input type="file" id="file" name="file" className="inputfile" onChange={handleImageChange} />
                            <label htmlFor="file" className="image-upload-label">
                                <div className="upload-icon-container">
                                    <img src={iconoSubir} alt="Subir" />
                                </div>
                                Subir imagen
                            </label>
                        </div>
                    </div>
                    </div>
                    <div className="cont3"> {/* Nuevo contenedor para el botón */}
                        <div className="form-group">
                            <button className="custom-button blue">Subir</button>
                        </div>
                    </div>
                   
                    
                </fieldset>
                
            </div>
        </>
    );
};

export default SubirArchivo;
