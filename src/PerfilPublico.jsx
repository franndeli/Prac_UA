import React from 'react'
import Card from './Card'

export default function PerfilPublico() {
  return (
    <div>
        <p>Mi perfil</p>
        <div>
            <p>Pablo Simón Nicolás</p>
            <p>Ingenieria Multimedia</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae recusandae veritatis architecto accusantium ad illum voluptates autem eligendi nesciunt vitae, deserunt dolorum illo facere, alias quae totam eos odio sequi?</p>
            <p>Poner Imagen</p>        
        </div>

        <div>
            Publicaciones
            <div>
                <select multiple name="Tipo" id="Tipo">
                    <option>TFG</option>
                    <option>TFM</option>
                </select>
                <select multiple name="Contenido" id="Contenido">
                    <option>Word</option>
                    <option>Audio</option>
                    <option>Video</option>
                    <option>Excel</option>
                </select>
            </div>

            <div>
              <Card />
              <Card />
              <Card />
            </div>
        </div>

    </div>
  )
}
