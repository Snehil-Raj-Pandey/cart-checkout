import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GiftProvider } from './context/GiftContext.jsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GiftProvider>
        <App />
      </GiftProvider>
    </React.StrictMode>
  );
}
