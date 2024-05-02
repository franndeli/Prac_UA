import React from 'react';
import './PubliDetalle.css';
import Nav from './Nav.jsx'
import Persona from './images/persona.svg';
import RatingStars from './RatingStars';
import ImgArchivo from './images/img_archivo.png';
import BtnDescargar from './images/btn-descargar.png';
import Btnguardar from './images/btn-guardar.png';

export default function PubliDetalle() {
    
    return (
        <>
            <div><Nav></Nav></div> 
            <div className="publidetalle-container">
                <div className="infocont">
                    <div className="izqcont"> 
                        <img className="Img-archivo" src={ImgArchivo} alt="archivo" />
                        <div className="botons-archivo">
                            <div id="btn-desc">
                                <p>DESCARGAR</p>
                                <img id="desc"src={BtnDescargar} alt="Descargar" />
                            </div>
                            <div id="btn-guard">
                                <p>GUARDAR</p>
                                <img id="guard" src={Btnguardar} alt="Guardar" />
                            </div>
                        </div>
                    </div>

                    <div className="drchcont"> 
                        <div className="infor-detalle">
                            <h2 className="titulo-det">Práctica 2. Usabilidad y Accesibilidad</h2>
                            <h5 className="titulo-det2">Práctica. Ingeniería Multimedia</h5>
                            <div className="nom-y-logo">
                                <img src={Persona} alt="usuario" />
                                <p id="nomUsuario">Pablo Simón Nicolás</p>
                            </div>
                            <p id="descripci-det">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ex quis augue vehicula feugiat. Donec et elit eleifend, interdum magna in, pretium nisl. Duis semper arcu sit amet velit vestibulum, eu convallis dui hendrerit. Pellentes vitae vestibulum. </p>
                            <div id="etiquetas-det">
                                <div id="eti1"><p id="pe">UA</p></div>
                                <div id="eti2"><p id="pe">Mockups</p></div>
                                <div id="eti3"><p id="pe">Figma</p></div>
                            </div>
                            <div className="estrellas-valoraciones">
                                <p className="rating-count">4</p>
                                <div className="star-rating">
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="star grey">&#9733;</span>
                                </div>
                                <div className="rating-separator"></div>
                                <p className="rating-count">56 valoraciones</p>
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
                
                <div className="comentcont"> 
                    <h2 id="titulo-coment">COMENTARIOS</h2>
                    <hr className="separador-coment"></hr>
                    <div className="coment1">
                        <div className="comentario1">
                            <img src={Persona} alt="usuario" />
                            <p id="nomUsuario">Pablo Simón Nicolás</p>
                            <div className="star-rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star grey">&#9733;</span>
                            </div>  
                        </div>
                        <div className="titulo-fecha">
                                <p id="mini-titulo">Mejorable</p>
                                <p id="fecha-coment"> 12 de marzo de 2027</p>
                        </div> 
                        
                    </div>
                    <hr className="separador-coment2"></hr>
                    <div className="coment1">
                        <div className="comentario1">
                            <img src={Persona} alt="usuario" />
                            <p id="nomUsuario">Lorena Heras Caballero</p>
                            <div className="star-rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star grey">&#9733;</span>
                            </div>  
                        </div>
                        <div className="titulo-fecha">
                            <p id="mini-titulo">Muy buen trabajo</p>
                            <p id="fecha-coment"> 12 de marzo de 2027</p>
                        </div> 
                        <div className="comentario2">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ex quis augue vehicula feugiat. Donec et elit eleifend, interdum magna in, pretium nisl. Duis semper arcu sit amet velit vestibulum, eu convallis dui hendrerit. Pellentes vitae vestibulum. </p>
                        </div>
                    </div>
                    <hr className="separador-coment2"></hr>
                    <div className="coment1">
                        <div className="comentario1">
                            <img src={Persona} alt="usuario" />
                            <p id="nomUsuario">Francisco José Delicado González</p>
                            <div className="star-rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star grey">&#9733;</span>
                                <span className="star grey">&#9733;</span>
                            </div>  
                        </div>
                        <div className="titulo-fecha">
                            <p id="mini-titulo">No está mal</p>
                            <p id="fecha-coment"> 12 de marzo de 2027</p>
                        </div> 
                        <div className="comentario2">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ex quis augue vehicula feugiat. Donec et elit eleifend, interdum magna in, pretium nisl. Duis semper arcu sit amet velit vestibulum, eu convallis dui hendrerit. Pellentes vitae vestibulum. </p>
                        </div>
                    </div>
                    <div className="final-coment">
                        <h3 className="titulo-final">Escribe tu opinión:</h3>
                        <div className="valor-comentar">
                            <div className="estrellitas">
                                <h7 id="tit">Valoración general</h7>
                                <RatingStars />
                            </div>
                            <div className="separeitor"></div>
                            <div id="destino">
                                <h3 className="titulo-final2">Añade un comentario</h3>
                                <input className="area-coment" type="text"></input>
                                <div className="final-btn">
                                    <div className="btn-coment">
                                        <p>Enviar opinión</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>               
            </div>
        </>
    );
};