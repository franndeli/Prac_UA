import './App.css';
import Formulario from './Formulario.jsx';
import PerfilPrivado from './PerfilPrivado.jsx';
import PerfilPublico from './PerfilPublico.jsx';
import Registro from './Registro.jsx';
// import Inicio from './Inicio.jsx';
import { Routes, Route } from "react-router-dom";
import IniciarSesion from './IniciarSesion.jsx';
import SubirArchivo from './SubirArchivo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            {/* <Route path="/inicio" element={<Inicio/>} /> */}
            <Route path="/iniciarsesion" element={<IniciarSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/perfil-privado" element={<PerfilPrivado />} />
            <Route path="/perfil-publico" element={<PerfilPublico />} />
            <Route path="/subir-archivo" element={<SubirArchivo />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;