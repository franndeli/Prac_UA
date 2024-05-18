import React, { useEffect, useState, useRef } from 'react';
import iconoSubir from './images/cam.svg';
import './SubirArchivo.css';
import camDefault from './images/cam_default.png';
import Nav from './Nav.jsx';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SubirArchivo = () => {
    const [imagePreview, setImagePreview] = useState(camDefault);
    const [tipoArchivo, setTipoArchivo] = useState('');
    const [tipo_academicos, setTipo_academico] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const storedUserId = localStorage.getItem('id_usuario');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

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
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
    };

    const handleMultipleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            files.forEach(file => {
                if (!updatedFiles.some(f => f.name === file.name && f.size === file.size)) {
                    updatedFiles.push(file);
                }
            });
            return updatedFiles;
        });
        fileInputRef.current.value = null;
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
    };

    const handleTipoArchivoChange = (event) => {
        setTipoArchivo(event.target.value);
    };

    const handleYoutubeLinkChange = (event) => {
        setYoutubeLink(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const singleFile = document.getElementById('file').files[0];
        const youtubeLink = document.getElementById('youtubeLink').value;

        formData.append('file', singleFile);
        selectedFiles.forEach((file, index) => {
            formData.append('file-array', file);
        });

        const youtubeLinkBlob = new Blob([youtubeLink], { type: 'text/plain' });
        formData.append('file-array', youtubeLinkBlob, 'youtubeLink.txt');

        formData.append('titulo', document.getElementById('titulo').value);
        formData.append('etiquetas', document.getElementById('etiquetas').value);
        formData.append('tipoArchivo', document.getElementById('tipo-archivo').value);
        formData.append('descripcion', document.getElementById('descripcion').value);

        try {
            const response = await fetch(`http://localhost:3001/api/subirArchivo/${storedUserId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir archivo desde el frontend');
            }

            Swal.fire({
                icon: 'success',
                title: 'Archivo subido',
                text: 'El archivo se ha subido correctamente',
            }).then(() => {
                navigate('/inicio');
            });
        } catch (error) {
            console.error('Error en la carga:', error);
        }
    };

    return (
        <div>
            <Nav />
            <legend>SUBIR ARCHIVO</legend>
            <div className="SubirArchivo-container">
                <form method="POST" action="/tu-endpoint" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <fieldset className="fielsetSubirArchivo">
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
                                <select className="" id="tipo-archivo" name="tipoArchivo" value={tipoArchivo} onChange={handleTipoArchivoChange}>
                                    {tipo_academicos.map(t => (
                                        <option key={t.id} value={t.nombre}>{t.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion" id="leibel">Descripción:</label>
                                <textarea id="descripcion" className="textarea-subir" name="descripcion" cols={20} required />
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="form-group imagen-subida lol">
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
                            <div className='MultiArchivo'>
                                <h3 className="MultiArchivo_h3">MultiArchivos</h3>
                                <div className="form-group imagen-subida">
                                    <div className="image-upload-container">
                                        <input type="file" id="file-array" name="file-array" className="inputfile" onChange={handleMultipleFileChange} multiple ref={fileInputRef} />
                                    </div>
                                    <ul>
                                        {selectedFiles.map((file, index) => (
                                            <li key={index}>
                                                {file.name}
                                                <button type="button" onClick={() => handleRemoveFile(index)}>Eliminar</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="youtubeLink" id="leibel">Enlace de YouTube:</label>
                                    <input type="text" id="youtubeLink" className="textarea-subir" name="youtubeLink" value={youtubeLink} onChange={handleYoutubeLinkChange} />
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
        </div>
    );
};

export default SubirArchivo;
