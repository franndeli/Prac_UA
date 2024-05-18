import React, { useEffect, useState, useRef } from 'react';
import iconoSubir from './images/cam.svg';
import './SubirArchivo.css';
import camDefault from './images/cam_default.png';
import Nav from './Nav.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarArchivo = () => {
    const { id } = useParams(); // Obtén el ID del archivo desde la URL
    const [imagePreview, setImagePreview] = useState(camDefault);
    const [titulo, setTitulo] = useState('');
    const [etiquetas, setEtiquetas] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoArchivo, setTipoArchivo] = useState('');
    const [tipo_academicos, setTipo_academico] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const storedUserId = localStorage.getItem('id_usuario');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const ruta = 'http://localhost:3001/uploads';

    useEffect(() => {
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

        const fetchArchivoData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/publicaciones/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del archivo');
                }
                const data = await response.json();
                const archivo = data[0];

                console.log(archivo);

                setTitulo(archivo.titulo);
                setEtiquetas(archivo.etiquetas);
                setDescripcion(archivo.descripcion);
                setTipoArchivo(archivo.tipo_academico_nombre);
                setYoutubeLink(archivo.youtubeLink);
                // Aquí asumiendo que el archivo tiene una propiedad `imagePreview`
                setImagePreview(`${ruta}/${archivo.ruta_archivo}` || camDefault);
                // Aquí asumiendo que el archivo tiene una propiedad `selectedFiles` como lista de archivos
                // setSelectedFiles(archivo.ruta_archivo_array || []);
                console.log(imagePreview);
            } catch (error) {
                console.error('Error al cargar los datos del archivo:', error);
            }
        };

        fetchTipo_academico();
        fetchArchivoData();
    }, [id]);

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

    const handleTituloChange = (e) => setTitulo(e.target.value);
    const handleEtiquetasChange = (e) => setEtiquetas(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);
    const handleTipoArchivoChange = (event) => setTipoArchivo(event.target.value);
    const handleYoutubeLinkChange = (event) => setYoutubeLink(event.target.value);

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

        formData.append('titulo', titulo);
        formData.append('etiquetas', etiquetas);
        formData.append('tipoArchivo', tipoArchivo);
        formData.append('descripcion', descripcion);

        try {
            const response = await fetch(`http://localhost:3001/api/editarArchivo/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al editar archivo desde el frontend');
            }

            Swal.fire({
                icon: 'success',
                title: 'Archivo editado',
                text: 'El archivo se ha editado correctamente',
            }).then(() => {
                navigate('/inicio');
            });
        } catch (error) {
            console.error('Error en la edición:', error);
        }
    };

    return (
        <div>
            <Nav />
            <legend>EDITAR ARCHIVO</legend>
            <div className="SubirArchivo-container">
                <form method="POST" action="/tu-endpoint" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <fieldset className="fielsetSubirArchivo">
                        <div className="cont1">
                            <div className="form-group">
                                <label htmlFor="titulo" id="leibel">Título:</label>
                                <input type="text" id="titulo" className="textarea-subir" name="titulo" value={titulo} onChange={handleTituloChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="etiquetas" id="leibel">Etiquetas:</label>
                                <input type="text" id="etiquetas" className="textarea-subir" name="etiquetas" value={etiquetas} onChange={handleEtiquetasChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipo-archivo" id="leibel">Tipo de Contenido:</label>
                                <select className="textarea-subir-select" id="tipo-archivo" name="tipoArchivo" value={tipoArchivo} onChange={handleTipoArchivoChange}>
                                    {tipo_academicos.map(t => (
                                        <option key={t.id} value={t.nombre}>{t.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion" id="leibel">Descripción:</label>
                                <textarea id="descripcion" className="textarea-subir" name="descripcion" value={descripcion} onChange={handleDescripcionChange} cols={20} required />
                            </div>
                        </div>
                        <div className="cont2">
                            <div className="form-group imagen-subida lol">
                                <div className="image-upload-container">
                                    <img src={imagePreview} alt="Imagen por defecto" className="image-preview" />
                                    <input type="file" id="file" name="file" className="inputfile" onChange={handleImageChange} />
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
                                <button type="submit" className="custom-button blue">Guardar Cambios</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default EditarArchivo;
