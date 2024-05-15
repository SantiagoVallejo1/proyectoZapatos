import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './components/Router';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>
);

