// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/styles/global.css';

import './components/styles/about.css';
import './components/styles/archive.css';
import './components/styles/donate.css';
import './components/styles/footer.css';
import './components/styles/header.css';
import './components/styles/home.css';
import './components/styles/not-found.css';
import './components/styles/post-detail.css';
import './components/styles/post-item.css';
import './components/styles/post-list.css';
import './components/styles/subscribe.css';
import './components/styles/donation-section.css';

//import './components/styles/styles.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
