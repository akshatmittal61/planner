import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { WebProvider } from './components/Context/WebContext';
import "./style.css";

ReactDOM.render(
  <WebProvider>
    <App />
  </WebProvider>,
  document.getElementById('root')
);