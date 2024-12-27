import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.body.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);

    if (newTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', newTheme);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); 
      setIsMenuOpen(false);
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
          {!isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="theme-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.75a8.25 8.25 0 11-8.719-8.217 6 6 0 108.719 8.217z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="theme-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5M12 19.5V21M4.636 4.636l1.061 1.061M17.303 17.303l1.061 1.061M3 12h1.5M19.5 12H21M4.636 19.364l1.061-1.061M17.303 6.697l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
                />
              </svg>
            )}
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
