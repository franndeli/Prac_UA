import React from 'react'
import Card from './Card'

export default function PerfilPrivado() {
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
            <button>
                Editar Perfil
            </button>
        </div>

        <div>
            Publicaciones
            <div>
                Tipo
                <select multiple name="Tipo" id="Tipo">
                    <option>TFG</option>
                    <option>TFM</option>
                </select>
                Contenido
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
