import React, { useEffect, useState } from 'react';
import iconoSubir from './images/cam.svg';
import './SubirArchivo.css';
import camDefault from './images/cam_default.png';
import Nav from './Nav.jsx'
import { useNavigate } from 'react-router-dom';
import AdjustableSelect from './helpers/AdjustableSelects.jsx';

const SubirArchivo = () => {
    const [imagePreview, setImagePreview] = useState(camDefault); // Estado para manejar la previsualización de la imagen
    const [tipoArchivo, setTipoArchivo] = useState(''); // Estado para manejar el tipo de archivo
    const [tipo_academico, setTipo_academico] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchTipo_academico = async () => {
            try {
              const response = await fetch('http://localhost:3001/api/tipo_academico');
              if (!response.ok) {
                throw new Error('Error al cargar tipo_academico');
              }
              const data = await response.json();
              setTipo_academico(data);
            } catch (error) {
              console.error('Error al cargar las tipo_academico:', error);
            }
          };
        
        fetchTipo_academico();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleTipoArchivoChange = (event) => {
        setTipoArchivo(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', document.getElementById('file').files[0]);
        formData.append('titulo', document.getElementById('titulo').value);
        formData.append('etiquetas', document.getElementById('etiquetas').value);
        formData.append('tipo_archivo', document.getElementById('tipo-archivo').value);
        formData.append('descripcion', document.getElementById('descripcion').value);
    
        try {
            const response = await fetch('http://localhost:3001/api/subirArchivo', {
                method: 'POST',
                body: formData, // No establecer 'Content-Type' aquí; FormData lo hará automáticamente
            });
            
            if (!response.ok) {
                throw new Error('Error al subir archivo');
            }
    
            console.log('Archivo subido correctamente');
            //redirección al subir archivo
            navigate('/inicio');
            
            // Manejar la respuesta adecuadamente
        } catch (error) {
            console.error('Error en la carga:', error);
        }
    };
    

    return (
        <>
            <Nav />
            <legend>SUBIR ARCHIVO</legend>
            <div className="SubirArchivo-container">
            
                <form  method="POST" action="/tu-endpoint" enctype="multipart/form-data" onSubmit={handleSubmit}>
                    
                    <fieldset className="fielsetSubirArchivo"  >
                        <div className="cont1">
                            <div className="form-group">
                                <label htmlFor="titulo" id="leibel">Título:</label>
                                <input type="text" id="titulo" className="textarea-subir" name="titulo" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="etiquetas" id="leibel">Etiquetas:</label>
                                <input type="text" id="etiquetas" className="textarea-subir" name="etiquetas" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipo-archivo" id="leibel">Tipo de Contenido:</label>
                                <AdjustableSelect options={tipo_academico} defaultText="Tipo" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion" id="leibel">Descripción:</label>
                                <textarea id="descripcion" className="textarea-subir" name="descripcion" required />
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="form-group imagen-subida">
                                <div className="image-upload-container">
                                    <img src={imagePreview} alt="Imagen por defecto" className="image-preview" />
                                    <input type="file" id="file" name="file" className="inputfile" onChange={handleImageChange} required />
                                    <label htmlFor="file" className="image-upload-label">
                                        <div className="upload-icon-container">
                                            <img src={iconoSubir} alt="Subir" />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="cont3">
                            <div className="form-group-botn">
                                <button type="submit" className="custom-button blue">Subir</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default SubirArchivo;
