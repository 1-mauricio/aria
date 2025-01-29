import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";
import CONFIG from "../../CONFIG";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(
		localStorage.getItem("theme") == "dark" ? true : false
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
	const [isSearchInputOpen, setIsSearchInputOpen] = useState(!isDesktop);
	const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

	const headerRef = useRef(null);
	const navigate = useNavigate();

	const location = useLocation();
	const isHome = location.pathname === "/";

	useEffect(() => {
		const handleResize = () => {
			const biggerThan768 = window.innerWidth >= 768;
			setIsDesktop(biggerThan768);
			if (biggerThan768) setIsSearchInputOpen(false);
			else setIsSearchInputOpen(true);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsHeaderCollapsed(true);
			} else {
				setIsHeaderCollapsed(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			setIsDarkMode(true);
			document.body.setAttribute("data-theme", "dark");
		} else {
			setIsDarkMode(false);
			document.body.removeAttribute("data-theme");
		}
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				(isSearchOpen &&
					headerRef.current &&
					!headerRef.current.contains(event.target)) ||
				(isMenuOpen &&
					headerRef.current &&
					!headerRef.current.contains(event.target))
			) {
				setIsSearchOpen(false);
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [isSearchOpen, isMenuOpen]);

	const toggleTheme = () => {
		const newTheme = !isDarkMode ? "dark" : "light";
		setIsDarkMode(!isDarkMode);

		if (newTheme === "dark") {
			document.body.setAttribute("data-theme", "dark");
		} else {
			document.body.removeAttribute("data-theme");
		}

		localStorage.setItem("theme", newTheme);
	};

	const toggleSearch = () => {
		if (isMenuOpen) setIsMenuOpen(false);

		setIsSearchOpen(!isSearchOpen);
	};

	const toggleSearchInput = () => {
		if (!isDesktop) return;
		if (isSearchInputOpen && searchQuery.trim() === "") {
			setIsSearchInputOpen(false);
			return;
		}
		setIsSearchInputOpen(true);
	};

	const toggleMenu = () => {
		if (isSearchOpen) setIsSearchOpen(false);
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(
				`/search?searchTerm=${encodeURIComponent(searchQuery.trim())}`
			);
			setSearchQuery("");
			setIsSearchOpen(false);
		}
	};

	return (
		<header
			className={`header ${isHeaderCollapsed ? "collapsed" : ""}`}
			ref={headerRef}
		>
			<div className="header-content">
				<div className="left-section">
					<Link to="/" className="site-title">
						<img className="logo-img" src="/assets/a-aria.gif" />
					</Link>
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

					<button
						className="search-button mobile"
						onClick={toggleSearch}
					>
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

					<div className="menu-hamburger" onClick={toggleMenu}>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>

				<nav
					className={`nav-menu search ${
						isSearchOpen ? "active" : ""
					}`}
				>
					<form
						className="search-container"
						onSubmit={handleSearchSubmit}
					>
						<input
							type="text"
							className={`search-input ${
								!isSearchInputOpen ? "collapsed" : ""
							}`}
							placeholder="Pesquisar..."
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<button
							type="submit"
							className="search-button"
							onClick={toggleSearchInput}
						>
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
				</nav>

				<nav className={`nav-menu links ${isMenuOpen ? "active" : ""}`}>
					{/*
					<Link to="/" onClick={() => setIsMenuOpen(false)}>
						Home
					</Link>
					*/}
					<Link to="/posts" onClick={() => setIsMenuOpen(false)}>
						Arquivo
					</Link>
					<Link to="/sobre" onClick={() => setIsMenuOpen(false)}>
						Sobre
					</Link>
					<div className="action-buttons">
						<Link
							to="/doe"
							className="subscribe-button"
							onClick={() => setIsMenuOpen(false)}
						>
							Apoie
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
