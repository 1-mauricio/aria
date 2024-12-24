import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <Link to="/" className="home-button">Voltar para Home</Link>
      </div>
    </main>
  );
}