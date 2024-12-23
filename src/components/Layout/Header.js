import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="site-title">
          Imprensa Malakoff
        </Link>

        {/* Menu Hambúrguer (visível apenas em dispositivos móveis) */}
        <div className="menu-hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navegação (visível em desktop ou quando o menu hambúrguer for ativado) */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/archive">Posts</Link>
          <Link to="/about">Sobre</Link>
          <div className="action-buttons">
            <Link to="/subscribe" className="subscribe-button">Inscreva-se</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
