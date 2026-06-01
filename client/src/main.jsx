import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('[main.jsx] Starting...');
const rootElement = document.getElementById('root');
console.log('[main.jsx] rootElement:', rootElement);
if (!rootElement) {
  console.error('[main.jsx] Root element not found!');
} else {
  console.log('[main.jsx] Creating root and rendering App');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[main.jsx] Render called');
}