import logo from './logo.svg';
import './App.css';
import Formulario from './Formulario.js';
import PerfilPrivado from './PerfilPrivado.js';
import PerfilPublico from './PerfilPublico.js';
import { createBrowserRouter,} from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Formulario />,
  },
  {
    path: "/",
    element: <PerfilPrivado />,
  },
  {
    path: "/",
    element: <PerfilPublico />,
  },
]

const router = createBrowserRouter(routes);

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
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
