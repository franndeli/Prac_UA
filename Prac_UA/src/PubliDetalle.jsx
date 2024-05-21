import React, { useState, useEffect } from 'react';
import './PubliDetalle.css';
import Nav from './Nav.jsx';
import Persona from './images/persona.svg';
import RatingStars from './RatingStars';
import BtnDescargar from './images/btn-descargar.png';
import Btnguardar from './images/btn-guardar.png';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import YouTube from 'react-youtube';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function PubliDetalle() {
    const ruta = "http://localhost:3001/uploads";
    const [datosConEtiquetas, setDatosConEtiquetas] = useState([]);
    const [datosUser, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newCommentTitle, setNewCommentTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [files, setFiles] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');

    const storedUserId = localStorage.getItem('id_usuario');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const publiID = id;

    const handleDownload = async () => {
        const zip = new JSZip();
        const imgFolder = zip.folder("files");

        const filteredFiles = files.filter(file => !file.includes('youtube.com') && !file.includes('youtu.be'));

        for (const file of filteredFiles) {
            const response = await fetch(ruta + '/' + encodeURIComponent(file));
            if (!response.ok) {
                console.error(`Failed to fetch file: ${file}`);
                continue;
            }
            const blob = await response.blob();
            imgFolder.file(file, blob);
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "Contenidos.zip");
        });
    };

    const handleDownloadCurrent = async () => {
        const currentFile = files[currentImageIndex];
        if (currentFile.includes('youtube.com') || currentFile.includes('youtu.be')) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se puede descargar un enlace de YouTube.',
            });
            return;
        }
        const response = await fetch(ruta + '/' + encodeURIComponent(currentFile));
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo descargar el archivo actual.',
            });
            return;
        }
        const blob = await response.blob();
        saveAs(blob, currentFile);
    };

    const handleDownloadPrompt = () => {
        Swal.fire({
            title: 'Seleccione una opción de descarga',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Descargar Archivo Actual',
            denyButtonText: 'Descargar Todos los Archivos',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDownloadCurrent();
            } else if (result.isDenied) {
                handleDownload();
            }
        });
    };

    useEffect(() => {
        const datosProcesados = datosUser.map(user => {
            let etiquetas = [];
            if (typeof user.EtiquetasPubli === 'string') {
                try {
                    etiquetas = JSON.parse(user.EtiquetasPubli) || [];
                } catch (e) {
                    etiquetas = [];
                }
            }
            return { ...user, etiquetas: Array.isArray(etiquetas) ? etiquetas : [] };
        });
        setDatosConEtiquetas(datosProcesados);
    }, [datosUser]);

    useEffect(() => {
        fetchComments();
        fetchPubliUser();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/datosUsuarioPubli/${publiID}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor !!');
            }
            
            const data = await response.json();
            console.log('Datos recibidos:', data);
    
            let additionalFiles = [];
    
            if (Array.isArray(data) && data.length > 0) {
                const firstItem = data[0];
                if (firstItem.ruta_archivo_array && firstItem.ruta_archivo_array.length > 0) {
                    additionalFiles = firstItem.ruta_archivo_array.split(',');
                    console.log(additionalFiles);
                }
            }

            setFiles(additionalFiles);
            setUser(data);
            setLoading(false);

            const youtubeFile = additionalFiles.find(file => file.includes('youtube.com') || file.includes('youtu.be'));
            if (youtubeFile) {
                setYoutubeLink(youtubeFile);
            }
        } catch (error) {
            console.log('Error al obtener los datos !!', error);
        }
    };

    const fetchPubliUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/mostrarComentarios/${publiID}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setComments(data);
                setLoading(false);
            } else {
                console.error('Error al obtener comentarios:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/guardarComentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    commentTitle: newCommentTitle,
                    comment: newComment,
                    rating: rating,
                    userId: storedUserId,
                    photoId: publiID
                }),
            });
            if (response.ok) {
                const updatedCommentsResponse = await fetch(`http://localhost:3001/api/mostrarComentarios/${publiID}`);
                if (updatedCommentsResponse.ok) {
                    const updatedCommentsData = await updatedCommentsResponse.json();
                    setComments(updatedCommentsData);
                    setNewComment('');
                    setNewCommentTitle('');
                } else {
                    console.error('Error al obtener comentarios actualizados:', updatedCommentsResponse.statusText);
                }
            } else {
                console.error('Error al enviar comentario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleNextImage = () => {
        if (files.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % files.length);
        }
    };
    
    const handlePrevImage = () => {
        if (files.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
        }
    };

    const handleSavePubli = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/guardarPubli/${publiID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al guardar la publicación');
            }

            const data = await response.json();
            console.log('Publicación guardada:', data);
        
            Swal.fire({
                icon: 'success',
                title: 'Publicación guardada',
                text: 'La publicación se ha guardado correctamente.',
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.error('Error al guardar la publicación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar la publicación.',
            });
        }
    };

    const handleDesguardarPubli = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/desguardarPubli/${publiID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al guardar la publicación');
            }

            const data = await response.json();
            console.log('Publicación guardada:', data);
        
            Swal.fire({
                icon: 'success',
                title: 'Publicación eliminada',
                text: 'La publicación se ha eliminado correctamente de tu biblioteca.',
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.error('Error al guardar la publicación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al desguardar la publicación.',
            });
        }
    };

    const renderPreview = (fileName) => {
        const fileExtension = fileName.split('.').pop().toLowerCase();
        const filePath = `${ruta}/${encodeURIComponent(fileName)}`;
        const googleViewerUrl = `https://docs.google.com/gview?url=${filePath}&embedded=true`;
    
        switch (fileExtension) {
            case 'pdf':
                return filePath;
            case 'doc':
            case 'docx':
            case 'xls':
            case 'xlsx':
                return googleViewerUrl;
            default:
                return filePath;
        }
    };

    const extractYouTubeId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    };

    const isImageFile = (fileName) => {
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension);
    };

    return (
        <div>
            <Nav /> 
            <div className="publidetalle-container">
                {datosUser.map((user) => (
                    <div key={user.id}>
                        <div className="infocont">
                            <div className="izqcont">
                                <div className='multiImage'>
                                    {youtubeLink && files[currentImageIndex] === youtubeLink ? (
                                        <YouTube
                                            videoId={extractYouTubeId(youtubeLink)}
                                            className="youtube-iframe"
                                            alt={files[currentImageIndex]}
                                            opts={{
                                                width: '900px',
                                                height: '550px',
                                                playerVars: {
                                                    autoplay: 0,
                                                },
                                            }}
                                        />
                                    ) : (
                                        <>
                                            {isImageFile(files[currentImageIndex]) ? (
                                                <img
                                                    className="Img-archivo"
                                                    src={renderPreview(files[currentImageIndex])}
                                                    alt={files[currentImageIndex]}
                                                    style={{ width: '900px', height: '550px' }}
                                                />
                                            ) : ['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(files[currentImageIndex].split('.').pop().toLowerCase()) ? (
                                                <iframe
                                                    className="Img-archivo"
                                                    src={renderPreview(files[currentImageIndex])}
                                                    title="Document Preview"
                                                    alt={files[currentImageIndex]}
                                                    style={{ width: '900px', height: '550px', flexDirection: 'column', alignItems: ''}}
                                                />
                                            ) : files[currentImageIndex].split('.').pop().toLowerCase() === 'txt' ? (
                                                <iframe
                                                    className="Img-archivo"
                                                    src={renderPreview(files[currentImageIndex])}
                                                    title="Text File Preview"
                                                    alt={files[currentImageIndex]}
                                                    style={{ width: '900px', height: '550px' }}
                                                />
                                            ) : (
                                                <div style={{ width: '900px', height: '550px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                                    <p>{files[currentImageIndex]}</p>
                                                    <p>No está disponible la previsualización de este archivo</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {files.length > 1 && (
                                        <div className='BotonesImagePasar'>
                                            <button className='botonImagesPasar' onClick={handlePrevImage}>Anterior</button>
                                            <button className='botonImagesPasar' onClick={handleNextImage}>Siguiente</button>
                                        </div>
                                    )}
                                    {files.length > 1 && (
                                    <div className="pagina_tal_de_tal">
                                        <p>Archivo {currentImageIndex + 1} de {files.length} </p>
                                    </div>
                                )}
                                </div>
                                <div className="botons-archivo">
                                    <div id="btn-desc">
                                    <button className="btn-guard" onClick={handleDownloadPrompt}>Descargar</button>
                                        <FontAwesomeIcon alt="Descargar archivo" icon={fas.faDownload} />
                                    </div>
                                    <div id="btn-guard">
                                        <button className="btn-guard" onClick={() => { 
                                            if (user.guardado === 0) {
                                                handleSavePubli();
                                            } else {
                                                handleDesguardarPubli();
                                            }
                                        }}>
                                            {user.guardado === 0 ? (
                                                <>
                                                    Guardar <FontAwesomeIcon alt="Guardar Archivo" icon={fas.faBookmark} />
                                                </>
                                            ) : (
                                                <>
                                                    Quitar de Guardados <FontAwesomeIcon alt="Guardar Archivo" icon={fas.faX} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="drchcont">
                                <div className="infor-detalle">
                                    <h2 className="titulo-det">{user.titulo}</h2>
                                    <h5 className="titulo-det2">{user.Titulacion_nombre}</h5>
                                    <h5 className="titulo-det3">{user.TituloAcademico}</h5>
                                    <a className="userDirection" href={`/perfil-publico?userId=${user.id_usuario}`}>
                                        <div className="nom-y-logo">
                                            <img src={Persona} alt="usuario" />
                                            <p id="nomUsuario">{user.nombre}</p>
                                        </div>
                                    </a>
                                    <p id="descripci-det">{user.descripcion}</p>
                                    <div id="etiquetas-det">
                                    {user.EtiquetasPubli && user.EtiquetasPubli.length > 0 ? (
                                        user.EtiquetasPubli.split(',').map((etiqueta, index) => (
                                            <div key={index} id={`eti${index + 1}`}>
                                                <p id="pe">{etiqueta}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay etiquetas disponibles</p>
                                    )}
                                    </div>
                                    <div className="estrellas-valoraciones">
                                        <p className="rating-count"></p>
                                        <div className="star-rating">
                                            {user.Valor}
                                            {typeof user.Valor === 'number' && [...Array(parseInt(user.Valor))].map((_, index) => (
                                                <span key={index} className="star">&#9733;</span>
                                            ))}
                                            {typeof user.Valor === 'number' && [...Array(5 - parseInt(user.Valor))].map((_, index) => (
                                                <span key={index} className="star grey">&#9733;</span>
                                            ))}
                                        </div>
                                        <div className="rating-separator"></div>
                                        <p className="rating-count">{user.totalValoraciones} valoraciones</p>
                                    </div>
                                    <div className="boton-opinion-det"> 
                                        <button id="btn-det" onClick={() => 
                                            {document.getElementById('destino').scrollIntoView({ behavior: 'smooth' });}}>
                                            Escribir mi opinión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="comentcont"> 
                    <h2 id="titulo-coment">COMENTARIOS</h2>
                    <hr className="separador-coment"></hr>
                    {loading ? (
                        <p>Cargando comentarios...</p>
                    ) : comments.length === 0 ? (
                        <p>No hay comentarios aún.</p>
                    ) : (
                        comments.map(comment => (
                            <div className="coment1" key={comment.id}>
                                <div className="comentario1">
                                    <img src={Persona} alt="Imagen usuario" />
                                    <p id="nomUsuario">{comment.usuario}</p>
                                    <div className="star-rating">
                                        {[...Array(parseInt(comment.valoraciones))].map((_, index) => (
                                            <span key={index} className="star">&#9733;</span>
                                        ))}
                                        {[...Array(5 - parseInt(comment.valoraciones))].map((_, index) => (
                                            <span key={index} className="star grey">&#9733;</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="titulo-fecha">
                                    <p id="mini-titulo">{comment.titulo}</p>
                                    <p id="fecha-coment2">{comment.comentario}</p>
                                    <p id="fecha-coment">{formatDate(comment.fecha)}</p>
                                </div>
                            </div>
                        ))
                    )}
                    <hr className="separador-coment2" />
                    <div className="final-coment">
                    <h3 className="titulo-final">Escribe tu opinión:</h3>
                        <div className="valor-comentar">
                            <div className="estrellitas">
                                <h7 id="tit">Valoración general</h7>
                                <RatingStars onChange={setRating} />
                            </div>
                            <div className="separeitor"></div>
                            <div id="destino">
                                <h3 className="titulo-final2">Añade un título</h3>
                                <input
                                    className="area-coment2"
                                    type="text"
                                    value={newCommentTitle}
                                    onChange={e => setNewCommentTitle(e.target.value)}
                                />
                                <h3 className="titulo-final3">Añade un comentario</h3>
                                <input
                                    className="area-coment"
                                    type="text"
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                />
                                <div className="final-btn">
                                    <button className="btn-coment" type="submit" onClick={handleCommentSubmit}>
                                        <p>Enviar opinión</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
