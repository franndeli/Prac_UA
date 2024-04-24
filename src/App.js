import './App.css';
import Formulario from './Formulario.jsx';
import PerfilPrivado from './PerfilPrivado.jsx';
import PerfilPublico from './PerfilPublico.jsx';
import Inicio from './Inicio.jsx';
import { Routes, Route } from "react-router-dom";
import IniciarSesion from './IniciarSesion.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/inicio" element={<Inicio/>} />
            <Route path="/iniciarsesion" element={<IniciarSesion />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/perfil-privado" element={<PerfilPrivado />} />
            <Route path="/perfil-publico" element={<PerfilPublico />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;