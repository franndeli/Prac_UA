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
                <fieldset className="fielsetSubirArchivo">
                    
                    <div className="cont1">
                    <div className="form-group">
                        <label htmlFor="titulo" id="leibel">Título:</label>
                        <input type="text" id="titulo" className="textarea-subir" name="titulo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="etiquetas" id="leibel">Etiquetas:</label>
                        <input type="text" id="etiquetas" className="textarea-subir" name="etiquetas" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tipo-archivo" id="leibel">Tipo de Contenido:</label>
                        <select id="tipo-archivo" name="tipo-archivo">
                        <option value="" disabled selected></option>
                            <option >TFG</option>
                            <option >TFM</option>
                            <option>Práctica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion" id="leibel">Descripción:</label>
                        <textarea id="descripcion" className="textarea-subir" name="descripcion" />
                    </div>
                    </div>
                    <div className="cont2">
                    <div className="form-group imagen-subida">
                        <div className="image-upload-container">
                            <img src={imagePreview} alt="Imagen por defecto" className="image-preview" /> 
                            
                            <input type="file" id="file" name="file" className="inputfile" onChange={handleImageChange} />
                            <label htmlFor="file" className="image-upload-label">
                            <div className="upload-icon-container">
                                    <img src={iconoSubir} alt="Subir" />
                                </div>
                                
                            </label>
                            <label htmlFor="file"  id="leibel2">
                            Subir Imagen
                                    
                                
                            </label>
                            
                        </div>
                    </div>
                    </div>
                    <div className="cont3"> {/* Nuevo contenedor para el botón */}
                        <div className="form-group-botn">
                            <button className="custom-button blue">Subir</button>
                        </div>
                    </div>
                   
                    
                </fieldset>
                
            </div>
        </>
    );
};

export default SubirArchivo;
