import React, { useState, useEffect } from 'react';
import './PubliDetalle.css';
import Nav from './Nav.jsx';
import Persona from './images/persona.svg';
import RatingStars from './RatingStars';
import ImgArchivo from './images/img_archivo.png';
import BtnDescargar from './images/btn-descargar.png';
import Btnguardar from './images/btn-guardar.png';
import { useLocation } from 'react-router-dom';

export default function PubliDetalle() {

    const ruta = "http://localhost:3001/uploads/resized";

    const [datosUser, setUser] = useState([]);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newCommentTitle, setNewCommentTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Indice de la imagen actual
    const [images, setImages] = useState([]); // Lista de todas las imágenes

    const storedUserId = localStorage.getItem('id_usuario');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const publiID = id;

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
    
            let primaryImage = "";
            let additionalImages = [];
    
            if (Array.isArray(data) && data.length > 0) {
                const firstItem = data[0];
                primaryImage = firstItem.ruta_archivo;
                console.log(primaryImage);
                if (firstItem.ruta_archivo_array && firstItem.ruta_archivo_array.length > 0) {
                    additionalImages = firstItem.ruta_archivo_array.split(',');
                    console.log(additionalImages);
                }
            }
    
            setImages(primaryImage ? [primaryImage, ...additionalImages] : []);
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log('Error al obtener los datos !!', error);
        }
    };

    const fetchPubliUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/mostrarComentarios/${publiID}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data); // Asegúrate de que `data` sea un array
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
                // Después de enviar el comentario, obtén la lista actualizada de comentarios
                const updatedCommentsResponse = await fetch(`http://localhost:3001/api/mostrarComentarios/${publiID}`);
                if (updatedCommentsResponse.ok) {
                    const updatedCommentsData = await updatedCommentsResponse.json();
                    setComments(updatedCommentsData); // Actualiza el estado con los comentarios más recientes
                    setNewComment('');
                    setNewCommentTitle(''); // Limpia el título del nuevo comentario
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
        if (images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };
    
    const handlePrevImage = () => {
        if (images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <>
            <div><Nav></Nav></div> 
            <div className="publidetalle-container">
                {datosUser.map((user) => (
                                
                <div>
                    <div className="infocont">
                        <div className="izqcont">
                        <img 
                            className="Img-archivo" 
                            src={ruta + '/' + encodeURIComponent(images[currentImageIndex])} 
                            alt="archivo" 
                        />
                            <div className="botons-archivo">
                                <div id="btn-desc">
                                    <p>DESCARGAR</p>
                                    <img id="desc"src={BtnDescargar} alt="Descargar" />
                                </div>
                                <div id="btn-guard">
                                    <p>GUARDAR</p>
                                    <img id="guard" src={Btnguardar} alt="Guardar" />
                                    </div>
                                    <button onClick={handlePrevImage}>Anterior</button>
                                    <button onClick={handleNextImage}>Siguiente</button>
                            </div>
                        </div>

                        
                        <div className="drchcont">
                            <div className="infor-detalle">
                            <h2 className="titulo-det">{user.titulo}</h2>
                            <h5 className="titulo-det2">{user.titulacion}</h5>
                            <a href={`/perfil-publico?userId=${user.id_usuario}`}>
                                <div className="nom-y-logo">
                                    <img src={Persona} alt="usuario" />
                                    <p id="nomUsuario">{user.nombre}</p>
                                </div>
                            </a>
                            <p id="descripci-det">{user.descripcion}</p>
                            <div id="etiquetas-det">
                                <div id="eti1"><p id="pe">{user.etiquetas}</p></div>
                                <div id="eti2"><p id="pe">{user.etiquetas}</p></div>
                                <div id="eti3"><p id="pe">{user.etiquetas}</p></div>
                            </div>
                            <div className="estrellas-valoraciones">
                                <p className="rating-count"></p>
                                <div className="star-rating">
                                    {user.Valor}
                                    {typeof user.Valor === 'number' && [...Array(parseInt(user.Valor))].map((_, index) => (
                                        <span key={index} className="star">&#9733;</span>
                                    ))}
                                    { typeof user.Valor === 'number' && [...Array(5 - parseInt(user.Valor))].map((_, index) => (
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
                                    <img src={Persona} alt="usuario" />
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
        </>
    );
};