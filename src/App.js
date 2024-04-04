import logo from './logo.svg';
import './App.css';
import Formulario from './Formulario.jsx';
import PerfilPrivado from './PerfilPrivado.jsx';
import PerfilPublico from './PerfilPublico.jsx';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
          <Routes>
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/perfil-privado" element={<PerfilPrivado />} />
            <Route path="/perfil-publico" element={<PerfilPublico />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;