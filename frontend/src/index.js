import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the change here: from 'react-dom' to 'react-dom/client'
import './index.css';
import App from './App';

// Create the root element using createRoot() in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
