import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="site-title">
          Imprensa Malakoff
        </Link>

        <div className="menu-hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link> 
          <Link to="/posts" onClick={closeMenu}>Posts</Link> 
          <Link to="/sobre" onClick={closeMenu}>Sobre</Link> 
          {/*
          <div className="action-buttons">
            <Link to="/inscreva-se" className="subscribe-button" onClick={closeMenu}>Inscreva-se</Link> 
          </div>
          */}
          <div className="action-buttons">
            <Link to="/doe" className="subscribe-button" onClick={closeMenu}>Apoie</Link> 
          </div>
        </nav>
      </div>
    </header>
  );
}
