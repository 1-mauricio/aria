import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Função para atualizar o valor da pesquisa
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Função para realizar a pesquisa
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Limpa o campo de busca após redirecionar
      setIsMenuOpen(false); // Fecha o menu, caso esteja aberto
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="site-title">Imprensa Malakoff</Link>
        </div>

        <div className="right-section">
          <button onClick={toggleTheme} className="theme-button">
            <svg
              className="theme-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.75a8.25 8.25 0 11-8.719-8.217 6 6 0 108.719 8.217z"></path>
            </svg>
          </button>

          <div className="menu-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="16" y1="16" x2="20" y2="20"></line>
              </svg>
            </button>
          </form>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/sobre">Sobre</Link>
          <div className="action-buttons">
            <Link to="/doe" className="subscribe-button">Apoie</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
