import './PerfilPublico.css';
import Card from './Card.jsx';
import Nav from './Nav.jsx'

export default function PerfilPublico() {
    return (
      <div>
       <div><Nav></Nav></div> 
        <h1>Perfil de Pablo</h1>
        <div className='container'>
          <div className='InfoUsuario'>
            <div className='InfoUsuarioImage'>
              <p>Poner Imagen</p>
            </div>
            <div className='InfoUsuarioText'>
              <p>Pablo Simón Nicolás</p>
              <p>Ingenieria Multimedia</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae recusandae veritatis architecto accusantium ad illum voluptates autem eligendi nesciunt vitae, deserunt dolorum illo facere, alias quae totam eos odio sequi?</p>
            </div>
          </div>
        </div>
  
        <div className='PublicacionesPublico'>
            <h2 className='PubliPublico'>Publicaciones</h2>
                <div className='select-container-Publico'>
                    <label className='TipoContenidoPublico'>Tipo de contenido</label>
                        <select name="Tipo" id="Tipo">
                            <option>TFG</option>
                            <option>TFM</option>
                        </select>
                </div>
                <div className='cards-container'>
                    <Card className='card'/>
                    <Card className='card'/>
                    <Card className='card'/>
                </div>
        </div>

      </div>
    );
  }