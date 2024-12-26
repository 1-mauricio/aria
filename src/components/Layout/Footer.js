import React from 'react';

export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/sobre">Sobre</a>
            <a href="/posts">Posts</a>
            <a href="/inscreva-se">Newsletter</a>
          </div>
          <div className="footer-social">
            <a href="https://twitter.com/imprensamalakoff" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com/imprensamalakoff" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="footer-text">
            © 2024 Imprensa Malakoff
          </div>
        </div>
      </footer>
    );
  }
  