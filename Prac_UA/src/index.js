import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Inicio from './Inicio';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

